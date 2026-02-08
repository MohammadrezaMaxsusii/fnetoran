import { Button } from "@/components/ui/button";
import { useReactFlow, useStore } from "@xyflow/react";
import { Progress } from "@/components/ui/progress";
import SearchIcon from "@/shared/icons/search.svg?react";

export const CustomZoomSlider = () => {
  const { zoomIn, zoomOut } = useReactFlow();

  const zoom = useStore((state) => state.transform[2]);

  return (
    <div className="flex items-center gap-1 bg-gray-darker px-4 py-2 rounded-md border border-default">
      <div className="flex items-center gap-1 me-3 text-gray-lighter">
        <SearchIcon />
        <span className="text-smx">Zoom</span>
      </div>

      <Button
        className="bg-foreground text-muted-foreground hover:bg-foreground rounded-full size-5 p-0"
        onClick={() => zoomOut()}
      >
        -
      </Button>

      <Progress className="w-32 h-2.5 border-2 border-default p-px" value={Math.round(zoom * 100)} />

      <Button
        className="bg-foreground text-muted-foreground hover:bg-foreground rounded-full size-5 p-0"
        onClick={() => zoomIn()}
      >
        +
      </Button>

      <span className="ms-3">{Math.round(zoom * 100)}%</span>
    </div>
  );
};
