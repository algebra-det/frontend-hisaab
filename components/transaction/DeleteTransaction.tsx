"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/types";

import { getCookie } from "cookies-next";
import { Dispatch, SetStateAction } from "react";

export default function DialogDemo({
  transaction,
  openDelete,
  setOpenDelete,
}: {
  transaction: Transaction;
  openDelete: boolean;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
}) {
  const authToken = getCookie("authorization");

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent className='max-w-[325] sm:max-w-[425px] md:max-w-[625] lg:max-w-[625]'>
        <DialogHeader>
          <DialogTitle>Delete Transaction: </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {transaction.productName} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className='w-full' type='submit'>
            Yes
          </Button>
          <Button className='w-full' type='reset'>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
