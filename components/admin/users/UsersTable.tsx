import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Pencil, Trash2 } from 'lucide-react'

import { AdminUser } from '@/types'
import dayjs from 'dayjs'
import { dateTimeFormatDisplay } from '@/config/format'

function UsersTable({
  users,
  handleUserActiveChange
}: {
  users: AdminUser[]
  handleUserActiveChange: (value: boolean, user: AdminUser) => void
}) {
  return (
    <div>
      <Table>
        <TableCaption>A list of Admin Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='ml-10 w-fit'>Updated At</TableHead>
            <TableHead className='ml-10 text-right'>Active</TableHead>
            <TableHead className='w-24'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(q => (
            <TableRow key={q.id}>
              <TableCell className='font-medium'>{q.name}</TableCell>
              <TableCell>{q.email}</TableCell>
              <TableCell>{q.role}</TableCell>
              <TableCell>
                {dayjs(q.updatedAt).format(dateTimeFormatDisplay)}
              </TableCell>
              <TableCell className='text-right'>
                <Switch
                  id={`${q.id}-user`}
                  className='cursor-pointer'
                  checked={q.active}
                  onCheckedChange={value => handleUserActiveChange(value, q)}
                />
              </TableCell>
              <TableCell className='text-right flex justify-around ml-2'>
                <Pencil className='h-4 w-4 cursor-pointer' />
                <Trash2 className='ml-4 h-4 w-4 cursor-pointer' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
