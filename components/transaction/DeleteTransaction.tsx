'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Transaction } from '@/types'
import { useState } from 'react'

import { getCookie } from 'cookies-next'
import { Dispatch, SetStateAction } from 'react'
import Loading from '../custom/Loader'

export default function DialogDemo({
  transaction,
  openDelete,
  setOpenDelete,
  refetchTransactions,
}: {
  transaction: Transaction
  openDelete: boolean
  setOpenDelete: Dispatch<SetStateAction<boolean>>
  refetchTransactions: () => void
}) {
  const [loading, setLoading] = useState(false)
  const removeTransaction = async () => {
    try {
      let auth = getCookie('authorization')
      if (!auth) auth = ''

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(auth)),
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }
      )
      refetchTransactions()
      setOpenDelete(false)
    } catch (error) {
      console.log('Error: ', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625] lg:max-w-[625]'>
          <DialogHeader>
            <DialogTitle>Delete Transaction: </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {transaction.productName} ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-row'>
            <Button
              className='w-1/4'
              type='submit'
              onClick={() => removeTransaction()}
            >
              Yes
            </Button>
            <Button
              className='w-3/4 ml-1'
              type='reset'
              onClick={() => setOpenDelete(false)}
            >
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
