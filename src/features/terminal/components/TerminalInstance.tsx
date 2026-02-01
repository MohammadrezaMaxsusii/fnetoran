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
  const bufferRef = useRef("");
  const { device, deviceIsLoading } = useDeviceQuery(id);
  const [status, setStatus] = useState<
    "connected" | "connecting" | "disconnected"
  >("connecting");

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new XTermTerminal({
      cursorBlink: true,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 13,
      scrollback: 3000,
      theme: {
        background: "#0f1115",
        foreground: "#e5e7eb",
        cursor: "#e5e7eb",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(containerRef.current);
    fitAddon.fit();
    term.focus();

    term.writeln("\x1b[1;36mDevice Terminal\x1b[0m");
    term.writeln("Type 'reconnect' to try again\r\n");
    prompt(term);

    termRef.current = term;
    connect(term);

    term.onData((data) => handleInput(data, term));

    const observer = new ResizeObserver(() => fitAddon.fit());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      socketRef.current?.close();
      term.dispose();
    };
  }, [id]);

  // Socket handler
  function connect(term: XTermTerminal) {
    setStatus("connecting");
    term.writeln("\x1b[33mConnecting...\x1b[0m\r\n");

    const socket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL}/devices/terminal/${id}`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      term.writeln("\x1b[32mConnected ✔\x1b[0m\r\n");
    };

    socket.onmessage = (e) => term.write(`${e.data}\r\n`);

    socket.onclose = () => {
      setStatus("disconnected");
      term.writeln("\x1b[31mDisconnected 🔌\x1b[0m\r\n");
      prompt(term);
    };
  }

  // Input handler
  function handleInput(data: string, term: XTermTerminal) {
    const socket = socketRef.current;

    if (data === "\r") {
      term.write("\r\n");
      const cmd = bufferRef.current.trim();
      bufferRef.current = "";

      if (cmd === "clear" || cmd === "cls") term.clear();
      else if (socket?.readyState === WebSocket.OPEN) socket.send(cmd + "\n");

      prompt(term);
    } else if (data === "\u007F") {
      if (bufferRef.current.length) {
        bufferRef.current = bufferRef.current.slice(0, -1);
        term.write("\b \b");
      }
    } else {
      bufferRef.current += data;
      term.write(data);
    }
  }

  function prompt(term: XTermTerminal) {
    term.write("\x1b[94m>\x1b[0m ");
  }

  return (
    <>
      {/* Header of Terminal */}
      <div className="flex items-center justify-between px-4 py-2 bg-black">
        <div className="flex items-center gap-2">
          <span>📡 Device IP:</span>
          {deviceIsLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <span>{device?.data.ip}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <TerminalIcon className="size-5" />
          <span>(Terminal)</span>
        </div>

        {/* Status of terminal */}
        <div
          className={`flex items-center gap-2 ${
            status === "connected"
              ? "text-green-400"
              : status === "connecting"
                ? "text-yellow-400"
                : "text-red-400"
          }`}
        >
          <span>●</span>
          <span>{status}</span>
        </div>
      </div>

      {/* Terminal */}
      <div className="h-100 bg-[#0b0e14]">
        <div
          ref={containerRef}
          className="h-full text-sm focus:outline-none"
          onClick={() =>
            containerRef.current?.querySelector("textarea")?.focus()
          }
        />
      </div>
    </>
  );
};
