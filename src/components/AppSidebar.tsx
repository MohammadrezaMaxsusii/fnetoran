import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapse } from "./Collapse";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { sidebarItems } from "@/shared/constants/sidebarConstant";
import { Separator } from "./ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

export const AppSidebar = () => {
  const { open } = useSidebar();

  return (
    <div className="h-screen flex flex-col items-center gap-5 p-6 max-w-min **:data-side:flex **:data-side:flex-col **:data-side:min-h-0 sticky inset-y-0 start-0 z-40">
      {/* Logo */}
      <div
        className={cn(
          "flex place-content-center border-e border-default w-full px-5 py-1",
          !open && "w-full border-0 p-0",
        )}
      >
        {open ? (
          <img src="/images/logo.webp" alt="Logo" />
        ) : (
          <img src="/icons/minimalLogo.svg" alt="Logo" />
        )}
      </div>

      {/* Sidebar section */}
      <Sidebar
        collapsible="icon"
        className="border-0 rounded-4xl overflow-hidden relative"
      >
        <SidebarContent className="overflow-x-hidden">
          {/* Menu */}
          <SidebarGroup className="p-4">
            <SidebarGroupLabel>Direction</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map(({ title, children, url, icon }) => (
                  <SidebarMenuItem
                    key={title}
                    className={cn(
                      "has-hover:[&>a>img]:brightness-0 has-hover:[&>a>img]:invert",
                    )}
                  >
                    {children ? (
                      <Collapsible>
                        <CollapsibleTrigger
                          asChild
                          className="flex items-center justify-between w-full gap-2 cursor-pointer hover:bg-primary hover:text-white px-2 py-1 rounded-md"
                        >
                          <div>
                            <img src={icon} alt={title} />
                            <span>{title}</span>
                            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                          {children.map((child) => (
                            <Link
                              to={child.url}
                              className="flex items-center gap-2 ps-6 py-1"
                            >
                              ○<span>{child.title}</span>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link to={url} className="flex items-center gap-2">
                          <img src={icon} alt={title} />
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className={cn("p-6", !open && "mx-auto p-0 pb-4")}>
          {open && <Separator className="h-px w-full bg-default" />}
          <div className="flex items-center justify-between mt-2.5">
            <Collapse />
            {open && (
              <Button
                variant="secondary"
                size="icon-sm"
                className="border-2 border-primary bg-[#0E1332] size-9"
              >
                <img
                  src="/icons/guide.svg"
                  alt="guide icon"
                  className="size-5"
                />
              </Button>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
