'use client'
import { getCookie } from 'cookies-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Product } from '@/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function InfoProduct({
  product,
  open,
  setOpen
}: {
  product: Product
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [fetching, setFetching] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState({} as Product)

  const fetchProductDetails = async () => {
    try {
      setFetching(true)
      let auth = getCookie('authorization')
      if (!auth) auth = ''
      console.log('Cookie: ', auth, typeof auth)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(auth)),
            'Content-Type': 'application/json'
          }
        }
      )
      const productAdditionalInfo = await response.json()
      if (response.ok) {
        setAdditionalInfo(productAdditionalInfo.data)
      }
    } catch (error) {
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [])

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625px] lg:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>{product.productName}</DialogTitle>
            <DialogDescription>Product Description:</DialogDescription>
          </DialogHeader>
          <div>
            <div className='flex justify-between'>
              <p className='text-sm'>Total Sales: </p>
              <span>{product.totalSale} units</span>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm'>Purchase Price:</p>
              <span>&#8377; {product.purchasePrice}</span>
            </div>
            <div className='flex justify-between'>
              <p className='text-sm'>Last Selling Price:</p>
              <span>&#8377; {product.lastSellingPrice}</span>
            </div>
          </div>

          <DialogDescription>Additional Info:</DialogDescription>
          {fetching ? (
            <div className='animate-spin-slow ease-linear rounded-full border-dashed border-8 border-t-8 border-gray-200 h-6 w-6 sm:h-24 sm:w-24'></div>
          ) : (
            <div>
              <div className='flex justify-between'>
                <p className='text-sm'>Total Profit generated: </p>
                <span>&#8377; {additionalInfo.totalProfit}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InfoProduct
