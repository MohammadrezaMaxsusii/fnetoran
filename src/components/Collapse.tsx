import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export const Collapse = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant="secondary"
      size="icon-sm"
      className="border-2 border-default size-9"
    >
      <img
        src="/icons/collapse.svg"
        alt="collapse icon"
        className={cn("size-4", !open && "rotate-180")}
      />
    </Button>
  );
};
