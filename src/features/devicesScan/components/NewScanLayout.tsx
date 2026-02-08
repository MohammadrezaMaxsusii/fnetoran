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
const accordionItems = [
  {
    title: "Basic",
    children: [
      {
        title: "General",
        url: "/devices/new-scan/basic",
      },
    ],
  },
  {
    title: "Discovery",
  },
];

export const NewScanLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="w-full bg-gray-darker rounded-2xl">
      {/* Header of table */}
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

      <div className="p-7 flex gap-12">
        <div className="bg-background-default rounded-xl p-4.5 w-1/4">
          <Accordion type="single" collapsible defaultValue="item-1">
            {accordionItems.map((accordionItem) => (
              <AccordionItem value={accordionItem.title} className="space-y-1">
                <AccordionTrigger className="bg-gray-darker data-[state=open]:border data-[state=open]:border-orange data-[state=open]:text-orange px-4 py-2">
                  {accordionItem.title}
                </AccordionTrigger>
                {accordionItem.children && (
                  <AccordionContent className="ps-2">
                    {accordionItem.children.map(({ title, url }) => (
                      <Link
                        to={url}
                        className={cn(
                            "block px-4 py-2 border border-default rounded-lg",
                            url === pathname && "bg-orange"
                        )}
                      >
                        {title}
                      </Link>
                    ))}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Outlet />
      </div>
    </section>
  );
};
