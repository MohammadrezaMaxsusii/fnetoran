import { useCallback } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Position,
  type OnConnect,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import dagre from "dagre";
import { CustomNode, CustomZoomSlider, NodeSearch } from "../components";
import { ZoomSlider } from "@/components/zoom-slider";
import "@xyflow/react/dist/style.css";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const nodeTypes = {
  customNode: CustomNode,
};

export const initialNodes = [
  {
    id: "1",
    data: { image: "/public/images/os/vmware.svg", ip: "192.168.22.11" },
    type: "customNode",
    position,
  },
  {
    id: "2",
    data: { image: "/public/images/os/ubuntu.svg", ip: "192.168.33.11" },
    type: "customNode",
    position,
  },
  {
    id: "2a",
    data: { image: "/public/images/os/tplink.svg", ip: "192.168.22.72" },
    type: "customNode",
    position,
  },
  {
    id: "2b",
    data: { image: "/public/images/os/zyxel.svg", ip: "192.168.22.15" },
    type: "customNode",
    position,
  },
  {
    id: "2c",
    data: { image: "/public/images/os/tachyon.svg", ip: "192.168.57.38" },
    type: "customNode",
    position,
  },
  {
    id: "2d",
    data: { image: "/public/images/os/stormshield.svg", ip: "192.168.97.56" },
    type: "customNode",
    position,
  },
  {
    id: "3",
    data: { image: "/public/images/os/aviat.svg", ip: "192.168.22.43" },
    type: "customNode",
    position,
  },
  {
    id: "4",
    data: { image: "/public/images/os/aviat.svg", ip: "192.168.85.41" },
    type: "customNode",
    position,
  },
  {
    id: "5",
    data: { image: "/public/images/os/tplink.svg", ip: "192.168.99.99" },
    type: "customNode",
    position,
  },
  {
    id: "6",
    data: { image: "/public/images/os/allworx.svg", ip: "192.168.39.94" },
    type: "customNode",
    position,
  },
  {
    id: "7",
    data: { image: "/public/images/os/vmware.svg", ip: "192.168.49.80" },
    type: "customNode",
    position,
  },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType },
  { id: "e13", source: "1", target: "3", type: edgeType },
  { id: "e22a", source: "2", target: "2a", type: edgeType },
  { id: "e22b", source: "2", target: "2b", type: edgeType },
  { id: "e22c", source: "2", target: "2c", type: edgeType },
  { id: "e2c2d", source: "2c", target: "2d", type: edgeType },
  { id: "e45", source: "4", target: "5", type: edgeType },
  { id: "e56", source: "5", target: "6", type: edgeType },
  { id: "e57", source: "5", target: "7", type: edgeType },
];

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 225;
const nodeHeight = 225;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

export const AutoDiscovery = () => {
  const [nodes, _, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds),
      ),
    [],
  );

  const { getNode, setCenter } = useReactFlow();

  const handleSearch = useCallback(
    (nodeId: string) => {
      const node = getNode(nodeId);
      if (!node) return;

      const x = node.position.x + (node.width ?? nodeWidth) / 2;
      const y = node.position.y + (node.height ?? nodeHeight) / 2;

      setCenter(x, y, {
        zoom: 1.5,
        duration: 500,
      });
    },
    [getNode, setCenter],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{
        style: {
          strokeWidth: 4,
          strokeDasharray: "6 3",
          stroke: "#484848",
        },
      }}
    >
      <Panel position="top-right">
        <NodeSearch onSelect={handleSearch} />
      </Panel>
      {/* <Panel position="bottom-right">
        <CustomZoomSlider />
      </Panel> */}
      <ZoomSlider
        className="bg-gray-darker"
        position="bottom-right"
        orientation="horizontal"
      />
      <Background size={4} color="#222222" />
    </ReactFlow>
  );
};
