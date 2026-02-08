import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

type NodeSearchProps = {
  onSelect: (nodeId: string) => void;
};

export const NodeSearch = ({ onSelect }: NodeSearchProps) => {
  return (
    <InputGroup className="bg-gray-darker">
      <InputGroupInput
        placeholder="Search Device..."
        className="rounded px-2 py-1 text-sm w-100"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSelect(e.currentTarget.value);
          }
        }}
      />
      <InputGroupAddon align="inline-end">
        <SearchIcon className="text-white size-5" />
      </InputGroupAddon>
    </InputGroup>
  );
};
