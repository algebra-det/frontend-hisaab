import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";

import { Transaction } from "@/types";

export default function Transactions({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <>
      <Card className='sm:w-full'>
        <CardHeader className='flex flex-row justify-between px-3 pb-1 pt-3'>
          <div>
            <CardTitle className='text-3xl'>
              {transaction.productName}
            </CardTitle>
            <CardDescription>
              <p> Selling price: &#8377;{transaction.sellingPrice}</p>
              <p> Purchase Price: &#8377;{transaction.purchasePrice}</p>
            </CardDescription>
          </div>
          <div>
            <p className='text-3xl'>&#8377;{transaction.profit}</p>
            <p className='text-sm text-muted-foreground'>Profit</p>
          </div>
        </CardHeader>
        <CardFooter className='px-3 py-1 text-sm text-muted-foreground'>
          <p>{dayjs(transaction.updatedAt).format("DD/MM/YYYY hh:mm A")}</p>
        </CardFooter>
      </Card>
    </>
  );
}
