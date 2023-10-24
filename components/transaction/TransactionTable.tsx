import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

import dummyTransactions from "@/lib/dummyTransactions";
import { Transaction } from "@/types";

function transactionTable() {
  const transactions: Transaction[] = dummyTransactions;

  return (
    <div className='mt-5 grid place-content-center w-25'>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Product Name</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead className='ml-10 text-right'>Profit</TableHead>
            <TableHead className='w-24'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((q) => (
            <TableRow key={q.id}>
              <TableCell className='font-medium'>{q.productName}</TableCell>
              <TableCell>{q.purchasePrice}</TableCell>
              <TableCell>{q.sellingPrice}</TableCell>
              <TableCell className='text-right'>{q.profit}</TableCell>
              <TableCell className='text-right flex justify-around ml-2'>
                <Pencil className='h-4 w-4 cursor-pointer' />
                <Trash2 className='h-4 w-4 cursor-pointer' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default transactionTable;
