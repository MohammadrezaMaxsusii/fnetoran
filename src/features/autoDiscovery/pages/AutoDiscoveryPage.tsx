import { ReactFlowProvider } from "@xyflow/react";
import { AutoDiscovery } from "../components";

export const AutoDiscoveryPage = () => {
  return (
    <div className="w-full h-[calc(100vh-125px)] pe-5">
      <ReactFlowProvider>
        <AutoDiscovery />
      </ReactFlowProvider>
    </div>
  );
};
