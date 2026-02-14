import type { MiniMapNodeProps } from "@xyflow/react";

export const CustomMiniMapNode = ({
  x,
  y,
  width,
  height,
  selected,
}: MiniMapNodeProps) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={4}
      ry={4}
      fill={selected ? "#344EFE" : "#525252"}
    />
  );
};
