import { Skeleton } from "@/components/ui/skeleton";
import { useDeviceQuery } from "@/features/devices/hooks";
import { useEffect, useRef, useState } from "react";
import { Terminal as XTermTerminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import TerminalIcon from "@/shared/icons/devices.svg?react";
import "xterm/css/xterm.css";

type Props = {
  id: string;
};

export const TerminalInstance = ({ id }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTermTerminal | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { device, deviceIsLoading } = useDeviceQuery(id);
  const [status, setStatus] = useState<"connected" | "connecting" | "disconnected">("connecting");

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize terminal
    const term = new XTermTerminal({
      cursorBlink: true,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 16,
      scrollback: 3000,
      theme: { background: "#0f1115", foreground: "#e5e7eb", cursor: "#e5e7eb" },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(containerRef.current);
    fitAddon.fit();
    term.focus();

    termRef.current = term;

    // Initial terminal messages
    term.writeln("\x1b[1;36mDevice Terminal\x1b[0m");
    term.writeln("Type 'reconnect' to try again\r\n");
    writePrompt(term);

    // Connect to WebSocket
    connect(term);

    // Resize observer
    const observer = new ResizeObserver(() => fitAddon.fit());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      socketRef.current?.close();
      term.dispose();
    };
  }, [id]);

  // --- Terminal prompt ---
  function writePrompt(term: XTermTerminal) {
    term.write("\x1b[94m>\x1b[0m ");
  }

  // --- WebSocket connection ---
  function connect(term: XTermTerminal) {
    setStatus("connecting");
    term.writeln("\x1b[33mConnecting...\x1b[0m\r\n");

    const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/devices/terminal/${id}`);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      term.writeln("\x1b[32mConnected ✔\x1b[0m\r\n");
    };

    socket.onmessage = (e) => {
      // Directly write SSH output to terminal
      term.write(e.data);
    };

    socket.onclose = () => {
      setStatus("disconnected");
      term.writeln("\r\n\x1b[31mDisconnected 🔌\x1b[0m\r\n");
      writePrompt(term);
    };
  }

  // --- Handle input: stream-based ---
  useEffect(() => {
    const term = termRef.current;
    if (!term) return;

    // Send every keystroke directly to SSH backend
    const onDataHandler = (data: string) => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) return;

      socket.send(data);
    };

    term.onData(onDataHandler);

    // return () => {
    //   term.offData(onDataHandler);
    // };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black size-full">
        <div className="flex items-center gap-2">
          <span>📡 Device IP:</span>
          {deviceIsLoading ? <Skeleton className="h-4 w-24" /> : <span>{device?.data.ip}</span>}
        </div>

        <div className="flex items-center gap-1">
          <TerminalIcon className="size-5" />
          <span>(Terminal)</span>
        </div>

        <div className={`flex items-center gap-2 ${
          status === "connected" ? "text-green-400" :
          status === "connecting" ? "text-yellow-400" : "text-red-400"
        }`}>
          <span>●</span>
          <span>{status}</span>
        </div>
      </div>

      {/* Terminal container */}
      <div className="size-full bg-[#0f1115] p-4">
        <div ref={containerRef} className="h-full text-sm focus:outline-none"
             onClick={() => containerRef.current?.querySelector("textarea")?.focus()} />
      </div>
    </>
  );
};
