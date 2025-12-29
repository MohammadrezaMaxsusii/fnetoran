import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// To do refactor

export const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="secondary"
          size="icon-lg"
          className="border border-default"
        >
          <img
            src="/icons/bell.svg"
            alt="notification icon"
            className="size-6"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="rounded-xl p-8 w-full max-w-110">
        {/* Popover header section */}
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-bold">Notifications</h5>
          <Button variant="link" className="text-orange">
            Mark all as read
          </Button>
        </div>

        {/* Popover tabs section */}
        <Tabs defaultValue="account" className="w-100">
          <TabsList className="w-full p-0 border-b border-b-default rounded-none">
            <TabsTrigger
              value="all"
              autoFocus
              className="data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary text-muted-foreground p-0 -mb-1 data-[state=active]:border-b-4 data-[state=active]:border-b-primary rounded-none"
            >
              All
              <Badge
                variant="secondary"
                className="min-h-5 min-w-5 rounded-full p-1.25 tabular-nums"
              >
                25
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary text-muted-foreground p-0 -mb-1 data-[state=active]:border-b-4 data-[state=active]:border-b-primary rounded-none"
            >
              System
              <Badge
                variant="secondary"
                className="min-h-5 min-w-5 rounded-full p-1.25 tabular-nums"
              >
                19
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary text-muted-foreground p-0 -mb-1 data-[state=active]:border-b-4 data-[state=active]:border-b-primary rounded-none"
            >
              Roles
            </TabsTrigger>
            <TabsTrigger
              value="devices"
              className="data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary text-muted-foreground p-0 -mb-1 data-[state=active]:border-b-4 data-[state=active]:border-b-primary rounded-none"
            >
              Devices
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">Make changes to your all here.</TabsContent>
          <TabsContent value="system">Change your system here.</TabsContent>
          <TabsContent value="roles">Change your roles here.</TabsContent>
          <TabsContent value="devices">Change your devices here.</TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
