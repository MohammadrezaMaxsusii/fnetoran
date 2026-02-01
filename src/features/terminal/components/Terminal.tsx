import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { TerminalCreate } from "./TerminalCreate";
import { TerminalInstance } from "./TerminalInstance";
import "xterm/css/xterm.css";
import { useParams } from "react-router";
import { useDeviceQuery } from "@/features/devices/hooks";

export const Terminal = () => {
  const [tabs, setTabs] = useState<{ id: string; ip: string }[]>([]);
  const id = useParams().id as string;
  const [activeTab, setActiveTab] = useState<string>(id);
  const { device } = useDeviceQuery(id);

  useEffect(() => {
    const newTab = {
      id: device?.data.id,
      ip: device?.data.ip,
    };
    setTabs([newTab]);
  }, [id, device]);

  return (
    <section className="w-full bg-gray-darker rounded-t-2xl overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="overflow-hidden shadow-2xl gap-0"
      >
        <div className="flex items-center justify-between bg-gray-darker">
          <TabsList className="p-0 rounded-b-none rounded-none *:rounded-none *:data-[state=active]:bg-primary *:bg-[#0f1115]">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={String(tab.id)}>
                {tab.ip}
              </TabsTrigger>
            ))}
          </TabsList>

          <TerminalCreate tabs={tabs} setTabs={setTabs} />
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={String(tab.id)}>
            <TerminalInstance id={tab.id} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
