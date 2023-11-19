'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Product } from '@/types'
import { Dispatch, SetStateAction } from 'react'

function InfoProduct({
  product,
  open,
  setOpen,
}: {
  product: Product
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625px] lg:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>{product.productName}</DialogTitle>
            <DialogDescription>
              Add below details to create a new product.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InfoProduct
