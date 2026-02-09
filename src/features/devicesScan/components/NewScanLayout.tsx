import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import BackIcon from "@/shared/icons/back.svg?react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { accordionItems } from "../constants";
import { useEffect, useState } from "react";

export const NewScanLayout = () => {
  const [openItem, setOpenItem] = useState<string | undefined>();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const activeItem = accordionItems.find((item) =>
      isChildActive(item.children),
    )?.title;

    setOpenItem(activeItem);
  }, [pathname]);

  const isChildActive = (children?: { title: string; url: string }[]) => {
    return children?.some((child) => child.url === pathname);
  };

  return (
    <div className="pe-5">
      <section className="w-full bg-gray-darker rounded-2xl">
        {/* Header of section */}
        <div className="flex items-center justify-between p-7">
          <span className="text-lg font-bold text-primary">New Scan</span>
          <Button
            variant="secondary"
            className="border border-default"
            onClick={() => navigate("/devices/scan")}
          >
            <BackIcon className="size-5" />
            Back to List
          </Button>
        </div>

        <div className="px-7">
          <Separator className="bg-default" />
        </div>

        {/* content */}
        <div className="p-7 flex gap-12">
          <div className="bg-background-default rounded-xl p-4.5 w-1/4">
            {/* Sidebar of content */}
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
            >
              {accordionItems.map((accordionItem) => {
                const active = isChildActive(accordionItem.children);

                return (
                  <AccordionItem
                    key={accordionItem.title}
                    value={accordionItem.title}
                    className="space-y-1"
                  >
                    <AccordionTrigger
                      className={cn(
                        "bg-gray-darker px-4 py-2 no-underline!",
                        active &&
                          "border border-orange text-orange",
                      )}
                    >
                      {accordionItem.title}
                    </AccordionTrigger>

                    {accordionItem.children && (
                      <AccordionContent className="ps-2">
                        {accordionItem.children.map(({ title, url }) => {
                          const isActive = url === pathname;

                          return (
                            <Link
                              key={url}
                              to={url}
                              className={cn(
                                "block px-4 py-2 border border-default rounded-lg",
                                isActive && "bg-orange text-black",
                              )}
                            >
                              {title}
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Main content */}
          <Outlet />
        </div>
      </section>
    </div>
  );
};
