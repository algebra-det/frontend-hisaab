import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import dayjs from "dayjs";

import { Transaction } from "@/types";

export default function Transactions({
  transaction,
  openEditDialog,
  openDeleteDialog,
}: {
  openEditDialog: (transaction: Transaction) => void;
  openDeleteDialog: (transaction: Transaction) => void;
  transaction: Transaction;
}) {
  return (
    <>
      <Card className='w-full'>
        <CardHeader className='flex flex-row justify-between px-3 pb-1 pt-3'>
          <div className='w-full'>
            <CardTitle className='text-lg sm:text-xl flex justify-between w-full align-top'>
              <div>{transaction.productName}</div>
              <div className='flex mt-2'>
                <Pencil
                  onClick={() => openEditDialog(transaction)}
                  className='h-4 w-4 ml-2 cursor-pointer inline-block'
                />
                <Trash
                  onClick={() => openDeleteDialog(transaction)}
                  className='h-4 w-4 ml-2 cursor-pointer inline-block'
                />
              </div>
            </CardTitle>
            <CardDescription className='flex flex-row justify-between w-full'>
              <div>
                <p> Selling price: &#8377;{transaction.sellingPrice}</p>
                <p> Purchase Price: &#8377;{transaction.purchasePrice}</p>
              </div>

              <div>
                <p className='text-lg sm:text-xl font-semibold text-white'>
                  &#8377;{transaction.profit}
                </p>
                <p className='text-sm text-muted-foreground'>Profit</p>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className='px-3 py-1 text-sm text-muted-foreground'>
          <p>{dayjs(transaction.updatedAt).format("DD/MM/YYYY hh:mm A")}</p>
        </CardFooter>
      </Card>
    </>
  );
}
