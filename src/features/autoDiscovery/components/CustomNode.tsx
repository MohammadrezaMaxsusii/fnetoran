import { Button } from "@/components/ui/button";
import ArrowIcon from "@/shared/icons/rightArrow.svg?react";
import { Handle, Position } from "@xyflow/react";

type CustomNodeData = {
  image: string;
  ip: string;
};

export const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <>
      <Handle type="source" position={Position.Left} />

      <div className="relative size-40 rounded-2xl bg-linear-to-b from-[#1C1C1C] via-[#CDCDCD] to-[#202020] overflow-hidden grid place-content-center after:content-[''] after:size-10 after:bg-white after:rounded-full after:absolute after:-top-10 after:start-1/2 after:-translate-x-1/2 after:blur-[22px]">
        <div className="size-39 rounded-2xl bg-gray-darker p-3 grid place-content-center">
          <div className="rounded-full bg-linear-to-b p-8 from-[#171717] to-gray-items relative z-10">
            <img src={data.image} alt="vendor image" className="size-14" />
          </div>

          <div className="flex items-center w-11/12 rounded-full px-1.5 py-2 bg-background-default absolute bottom-1 start-1/2 -translate-x-1/2 z-20">
            <span className="inline-block grow text-xs text-gray-lighter text-center pe-1.5">
              {data.ip}
            </span>
            <Button className="rounded-full -rotate-45 size-6 absolute end-1">
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </div>
      
      <Handle type="target" position={Position.Right} />
    </>
  );
};
