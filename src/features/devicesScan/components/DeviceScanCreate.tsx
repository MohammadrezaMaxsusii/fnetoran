import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddIcon from "@/shared/icons/plus.svg?react";
import { Separator } from "@/components/ui/separator";
import RightArrowIcon from "@/shared/icons/rightArrow.svg?react";
import { newScantItems } from "../constants";
import { Link } from "react-router";

export const DeviceScanCreate = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <AddIcon className="text-foreground" />
          New Scan
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 max-h-11/12 max-w-115! **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Create a New Scan
          </DialogTitle>
          <DialogDescription className="hidden">
            Create another scan
          </DialogDescription>
        </DialogHeader>

        {/* Main content */}
        <div>
          <span className="text-sm text-orange">
            Choosing a name and role time limits
          </span>

          <Separator className="my-3 bg-default" />

          {/* Discovery section */}
          <div>
            <span className="text-primary text-sm font-bold ps-3">
              Discovery
            </span>
            <Link to="/devices/new-scan/basic" className="flex items-center gap-2 border border-default hover:border-primary p-2.5 pe-6 rounded-lg group">
              <img
                src="/images/radar.png"
                alt="radar image"
                className="size-16"
              />
              <div>
                <span className="text-sm font-bold">Host Discovery</span>
                <p className="text-xs text-gray-lighter">
                  A simple scan to discover live hosts and open ports.
                </p>
              </div>
              <Button className="size-11 bg-navy-blue border border-primary text-primary group-hover:bg-primary group-hover:text-white">
                <RightArrowIcon className="size-6" />
              </Button>
            </Link>
          </div>

          {/* Vulnerabilities section */}
          <div className="space-y-3 mt-6">
            <span className="text-primary text-sm font-bold ps-3">
              Vulnerabilities
            </span>
            {newScantItems.map((newScanItem) => (
              <Link
                to="#"
                key={newScanItem.title}
                className="flex items-center gap-2 border border-default hover:border-primary p-2.5 pe-6 rounded-lg group"
              >
                <img
                  src={newScanItem.image}
                  alt="radar image"
                  className="size-16"
                />
                <div>
                  <span className="text-sm font-bold">{newScanItem.title}</span>
                  <p className="text-xs text-gray-lighter">
                    {newScanItem.description}
                  </p>
                </div>
                <Button className="size-11 bg-navy-blue border border-primary text-primary group-hover:bg-primary group-hover:text-white">
                  <RightArrowIcon className="size-6" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
