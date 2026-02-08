import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceLink,
  forceY,
} from "d3-force";
import type { Node, Edge } from "@xyflow/react";

type ForceNode = Node & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
};

export const layoutNodes = (
  nodes: ForceNode[],
  edges: Edge[],
  width = 1600,
  height = 900,
): Node[] => {
  const simNodes = nodes.map((n) => ({ ...n }));
  const simEdges = edges.map((e) => ({ ...e }));

  const simulation = forceSimulation(simNodes as any)
    // Scatter secion
    .force("charge", forceManyBody().strength(-100))

    // Edge distance
    .force(
      "link",
      forceLink(simEdges as any)
        .id((d: any) => d.id)
        .distance(220)
        .strength(0.8),
    )

    // Avoid overlap
    .force("collision", forceCollide().radius(175))

    // Centerize section
    .force("center", forceCenter(width / 2, height / 2))

    // Y axis
    .force("y", forceY(height / 2).strength(0.08))

    .stop();

  // Iteraion section
  for (let i = 0; i < 50; i++) {
    simulation.tick();
  }

  return simNodes.map((n) => ({
    ...n,
    position: {
      x: n.x ?? 0,
      y: n.y ?? 0,
    },
  }));
};
