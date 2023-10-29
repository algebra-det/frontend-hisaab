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

import { AdminUser } from "@/types";

function UsersTable({ transactions }: { transactions: AdminUser[] }) {
  return (
    <div className='mt-5 grid place-content-center w-25'>
      <Table>
        <TableCaption>A list of Admin Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='ml-10 text-right'>Active</TableHead>
            <TableHead className='w-24'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((q) => (
            <TableRow key={q.id}>
              <TableCell className='font-medium'>{q.name}</TableCell>
              <TableCell>{q.email}</TableCell>
              <TableCell>{q.role}</TableCell>
              <TableCell className='text-right'>{q.active}</TableCell>
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

export default UsersTable;
