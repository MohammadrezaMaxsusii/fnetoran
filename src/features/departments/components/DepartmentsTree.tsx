import { Tree, TreeNode } from "react-organizational-chart";
import { DepartmentNode } from "./DepartmentNode";
import { useDepartmentsQuery } from "../hooks";
import type { DepartmentTree } from "../types";
import { DepartmentCreate } from "./DepartmentCreate";
import AddIcon from "@/shared/icons/plus.svg?react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import BuildingIcon from "@/shared/icons/building.svg?react";
import { useOrganizationQuery } from "@/features/organization/hooks";

// To do refactor

export const DepartmentsTree = () => {
  const { id } = useParams();

  const { organization } = useOrganizationQuery(Number(id));

  const {
    departments,
    departmentsIsLoading,
    departmentsIsError,
    departmentsError,
  } = useDepartmentsQuery({ id });

  if (departmentsIsLoading) return <div>Loading ...</div>;

  if (departmentsIsError)
    return <div>{departmentsError?.message || "Something went wrong."}</div>;

  const buildTree = (parent_id: number | null = null): DepartmentTree[] => {
    return (
      departments?.data
        ?.filter(
          (department: DepartmentTree) => department.parent_id === parent_id,
        )
        .map((department: DepartmentTree) => ({
          ...department,
          children: buildTree(department.id),
        })) || []
    );
  };

  const treeData = buildTree();

  const renderTree = (department: DepartmentTree): React.ReactNode => {
    return (
      <TreeNode
        key={department.id}
        label={<DepartmentNode department={department} />}
      >
        {department.children.map(renderTree)}
      </TreeNode>
    );
  };

  if (!treeData.length) {
    return (
      <Button className="flex items-center p-0 ms-auto">
        <AddIcon className="text-foreground" />
        <DepartmentCreate organizationId={Number(id)} />
      </Button>
    );
  }

  return (
    <>
      <Button className="flex items-center p-0 ms-auto">
        <AddIcon className="text-foreground" />
        <DepartmentCreate organizationId={Number(id)} />
      </Button>

      <div className="overflow-auto p-10">
        <Tree
          label={
            <div className="relative size-40 mx-auto rounded-2xl bg-linear-to-b from-[#1C1C1C] via-[#CDCDCD] to-[#202020] overflow-hidden grid place-content-center after:content-[''] after:size-10 after:bg-white after:rounded-full after:absolute after:-top-10 after:inset-s-1/2 after:-translate-x-1/2 after:blur-[22px]">
              <div className="size-39 rounded-2xl bg-gray-darker p-3 grid place-content-center">
                {/* Icon section */}
                <div className="rounded-full bg-linear-to-b p-8 from-[#171717] to-gray-items relative z-10">
                  <BuildingIcon className="size-14" />
                </div>

                {/* Footer section */}
                <div className="flex items-center justify-center w-11/12 rounded-full px-1.5 py-2 bg-background-default absolute bottom-1 inset-s-1/2 -translate-x-1/2 z-20 text-xs text-gray-lighter truncate">
                  {organization?.data.name}
                </div>
              </div>
            </div>
          }
          lineColor="white"
          lineWidth="2px"
          lineBorderRadius="10px"
        >
          {treeData.map(renderTree)}
        </Tree>
      </div>
    </>
  );
};
