import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserActions } from "../hooks";

interface Props {
  userId: number;
}

export const UserDelete = ({ userId }: Props) => {
  const { deleteUserAction } = useUserActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-darker hover:bg-red-darker border border-red p-2.5!">
          <img src="/icons/delete.svg" alt="delete icon" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background-default text-white p-8 overflow-y-auto border max-w-115! border-default **:last:data-[slot=dialog-close]:top-9 **:last:data-[slot=dialog-close]:end-8">
        {/* Hidden dialog header for screen readers */}
        <DialogHeader className="hidden">
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>Confirm deleting this user</DialogDescription>
        </DialogHeader>

        {/* Dialog content */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <img src="/icons/delete.svg" alt="delete icon" className="size-18" />
          <span className="text-lg text-red font-bold">Delete User</span>
          <p className="text-sm">Are you sure you want to Delete your User?</p>
        </div>

        {/* Dialog footer */}
        <DialogFooter className="grid grid-cols-2 gap-3 py-2">
          <DialogClose asChild>
            <Button variant="secondary" className="py-4">
              Later
            </Button>
          </DialogClose>
          <Button className="bg-red hover:bg-red/75 py-4" onClick={() => deleteUserAction.mutate({ userId })}>Yes, Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
