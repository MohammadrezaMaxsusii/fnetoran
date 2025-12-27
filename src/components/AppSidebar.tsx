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
import { Separator } from "@radix-ui/react-separator";
import { Collapse } from "./Collapse";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { sidebarItems } from "@/shared/constants/sidebarConstant";

export const AppSidebar = () => {
  const { open } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "h-[calc(100vh-20px)] row-span-2 flex flex-col items-center gap-5 p-6 max-w-min **:data-side:flex **:data-side:flex-col **:data-side:min-h-0",
        open && "items-start"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex place-content-center border-e border-default w-11/12 px-5 py-1",
          !open && "w-full border-0 p-0"
        )}
      >
        {open ? (
          <img src="/images/logo.webp" alt="Logo" />
        ) : (
          <img src="/icons/minimalLogo.svg" alt="Logo" />
        )}
      </div>

      <Sidebar
        collapsible="icon"
        className="border-0 rounded-4xl overflow-hidden relative flex flex-col min-h-0"
      >
        <SidebarContent className="overflow-x-hidden">
          {/* Menu */}
          <SidebarGroup className="p-4">
            <SidebarGroupLabel>Direction</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map(({ title, haveChilde, url, icon }) => (
                  <>
                    {haveChilde ? (
                      <SidebarMenuItem
                        key={title}
                        className={cn(
                          isActive(url) &&
                            "has-hover:[&>a>img]:brightness-0 has-hover:[&>a>img]:invert"
                        )}
                      >
                        {/* <SidebarMenuButton asChild>
                          <Link to={url} className="flex items-center gap-2">
                            <img src={icon} alt={title} />
                            <span>{title}</span>
                          </Link>

                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem />
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuButton> */}
                      </SidebarMenuItem>
                    ) : (
                      <SidebarMenuItem
                        key={title}
                        className={cn(
                          isActive(url) &&
                            "has-hover:[&>a>img]:brightness-0 has-hover:[&>a>img]:invert"
                        )}
                      >
                        <SidebarMenuButton asChild>
                          <Link to={url} className="flex items-center gap-2">
                            <img src={icon} alt={title} />
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className={cn("p-6", !open && "mx-auto p-0 pb-4")}>
          {open && <Separator className="h-px w-full bg-gray-lighter" />}
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
