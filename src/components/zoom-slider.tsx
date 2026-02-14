import { Minus, Plus } from "lucide-react";

import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  type PanelProps,
} from "@xyflow/react";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchIcon from "@/shared/icons/search.svg?react";

export function ZoomSlider({
  className,
  orientation = "horizontal",
  ...props
}: Omit<PanelProps, "children"> & {
  orientation?: "horizontal" | "vertical";
}) {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut } = useReactFlow();
  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);

  return (
    <div
      className={cn(
        "bg-primary-foreground text-foreground flex items-center gap-4 rounded-md px-4 py-2 border-2 border-default",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 me-3 text-gray-lighter">
        <SearchIcon />
        <span className="text-smx">Zoom</span>
      </div>

      <div
        className={cn(
          "flex items-center gap-1",
          orientation === "horizontal" ? "flex-row" : "flex-col-reverse",
        )}
      >
        <Button
          onClick={() => zoomOut({ duration: 300 })}
          className="size-5 p-0! rounded-full bg-foreground hover:bg-foreground text-muted-foreground"
        >
          <Minus />
        </Button>
        <Slider
          className={cn(
            "border-2 border-default rounded-full p-0.5 cursor-pointer [&>span>span[data-slot='slider-range']]:rounded-full [&>span[data-slot='slider-track']]:bg-gray-darker [&>span>span[data-slot='slider-thumb']]:hidden",
            orientation === "horizontal" ? "w-35 h-3.5" : "h-35 w-3.5",
          )}
          orientation={orientation}
          value={[zoom]}
          min={minZoom}
          max={maxZoom}
          step={0.01}
          onValueChange={(values) => zoomTo(values[0])}
        />
        <Button
          onClick={() => zoomIn({ duration: 300 })}
          className="size-5 p-0! rounded-full bg-foreground hover:bg-foreground text-muted-foreground"
        >
          <Plus />
        </Button>
      </div>
      <span className="font-bold min-w-11.5">%{(100 * zoom).toFixed(0)}</span>
    </div>
  );
}


{/* <Panel
      className={cn(
        "bg-primary-foreground text-foreground flex items-center gap-4 rounded-md px-4 py-2 border-2 border-default",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 me-3 text-gray-lighter">
        <SearchIcon />
        <span className="text-smx">Zoom</span>
      </div>

      <div
        className={cn(
          "flex items-center gap-1",
          orientation === "horizontal" ? "flex-row" : "flex-col-reverse",
        )}
      >
        <Button
          onClick={() => zoomOut({ duration: 300 })}
          className="size-5 p-0! rounded-full bg-foreground hover:bg-foreground text-muted-foreground"
        >
          <Minus />
        </Button>
        <Slider
          className={cn(
            "border-2 border-default rounded-full p-0.5 cursor-pointer [&>span>span[data-slot='slider-range']]:rounded-full [&>span[data-slot='slider-track']]:bg-gray-darker [&>span>span[data-slot='slider-thumb']]:hidden",
            orientation === "horizontal" ? "w-35 h-3.5" : "h-35 w-3.5",
          )}
          orientation={orientation}
          value={[zoom]}
          min={minZoom}
          max={maxZoom}
          step={0.01}
          onValueChange={(values) => zoomTo(values[0])}
        />
        <Button
          onClick={() => zoomIn({ duration: 300 })}
          className="size-5 p-0! rounded-full bg-foreground hover:bg-foreground text-muted-foreground"
        >
          <Plus />
        </Button>
      </div>
      <span className="font-bold min-w-11.5">%{(100 * zoom).toFixed(0)}</span>
    </Panel> */}