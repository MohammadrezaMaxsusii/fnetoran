import { Tree, TreeNode } from "react-organizational-chart";
import { LocationNode } from "./LocationNode";
import { useLocationsQuery } from "../hooks";
import type { LocationTree } from "../types";
import { LocationCreate } from "./LocationCreate";
import AddIcon from "@/shared/icons/plus.svg?react";
import { Button } from "@/components/ui/button";

// To do refactor

export const LocationsTree = () => {
  const { locations, locationsIsLoading, locationsIsError, locationsError } =
    useLocationsQuery();

  if (locationsIsLoading) return <div>Loading ...</div>;

  if (locationsIsError)
    return <div>{locationsError?.message || "Something went wrong."}</div>;

  const buildTree = (parent_id: number | null = null): LocationTree[] => {
    return locations?.data
      .filter((location: LocationTree) => location.parent_id === parent_id)
      .map((location: LocationTree) => ({
        ...location,
        children: buildTree(location.id),
      }));
  };

  const treeData = buildTree();

  const renderTree = (location: LocationTree): React.ReactNode => {
    return (
      <TreeNode key={location.id} label={<LocationNode location={location} />}>
        {location.children.map(renderTree)}
      </TreeNode>
    );
  };

  if (!treeData.length) {
    return (
      <Button className="flex items-center p-0 ms-auto">
        <AddIcon className="text-foreground" />
        <LocationCreate />
      </Button>
    );
  }

  return (
    <div className="overflow-auto p-10">
      {treeData.map((root) => (
        <Tree
          key={root.id}
          label={<LocationNode location={root} />}
          lineColor="white"
          lineWidth={"2px"}
          lineBorderRadius={"10px"}
        >
          {root.children.map(renderTree)}
        </Tree>
      ))}
    </div>
  );
};
