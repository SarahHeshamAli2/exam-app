"use client";
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

import { TriangleAlert } from "lucide-react";
import useDeleteAccount from "../_hooks/use-delete-account";

export function DeleteConfirmation() {
  const {
    deleteAccount,
    error,
    displayedErrorMessage,
    setErrorMessage,
    isPending,
  } = useDeleteAccount();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setErrorMessage("")}
          className="bg-red-50 text-red-600 hover:bg-red-100 w-96">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[558px]">
        <DialogHeader>
          <DialogTitle className="mx-auto mt-4">
            <div className="bg-red-50 w-28 h-28 rounded-full flex items-center justify-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center">
                <TriangleAlert size={50} className="text-red-500" />
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center font-mono mt-7">
            <p className="text-red-600 font-medium">
              Are you sure you want to delete your account?
            </p>
            <span className="text-sm text-gray-500">
              This action is permanent and cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        {error && displayedErrorMessage()}
        <DialogFooter className="mt-14 border-t py-5">
          <DialogClose asChild>
            <Button className="w-1/2 font-mono text-sm" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => deleteAccount()}
            disabled={isPending}
            className="w-1/2 font-mono text-sm"
            variant={"destructive"}
            type="submit">
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
