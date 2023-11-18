'use client'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import ProductsListWithCards from './ProductsListWithCards'
import NewProduct from './NewProduct'
import EditProduct from '@/components/product/EditProduct'
import { useEffect, useState } from 'react'
import { Product } from '@/types'
// import DeleteDialog from '../common/DeleteDialog'
import Filter from '@/components/common/Filter'
import dayjs from 'dayjs'
import { dateFormatAPI } from '@/config/format'
import ProductTable from './ProductTable'
import Loading from '../custom/Loader'

export default function MainProduct() {
  const limit = 10
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // const [openDelete, setOpenDelete] = useState(false)
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)
  const [offset, setOffset] = useState(0)
  const today = dayjs().format(dateFormatAPI)
  const [duration, setDuration] = useState('day')
  const [date, setDate] = useState(today)
  const [loadMore, setLoadMore] = useState(false)

  const [productData, setProductData] = useState({
    data: [] as Product[],
    count: 0,
  })
  const [edit, setEdit] = useState({} as Product)
  const openEditDialog = (editedProduct: Product) => {
    setEdit(editedProduct)
    setTimeout(() => {
      setOpen(true)
    }, 100)
  }
  // const openDeleteDialog = (editedProduct: Product) => {
  //   setEdit(editedProduct)
  //   setTimeout(() => {
  //     setOpenDelete(true)
  //   }, 100)
  // }
  const changeDuration = (value: string) => {
    setDuration(value)
  }
  const changeDate = (value: string) => {
    setDate(value)
  }

  // const confirmDelete = async () => {
  //   try {
  //     setFetching(true)
  //     let auth = getCookie('authorization')
  //     if (!auth) auth = ''

  //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${edit.id}`, {
  //       headers: {
  //         Authorization: JSON.parse(JSON.stringify(auth)),
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'DELETE',
  //     })
  //     fetchProducts()
  //     setOpenDelete(false)
  //   } catch (error) {
  //     console.log('Error: ', error)
  //   } finally {
  //     setFetching(false)
  //   }
  // }

  useEffect(() => {
    fetchProducts()
  }, [date, duration])

  const fetchProducts = async (page?: boolean) => {
    try {
      setFetching(true)
      let auth = getCookie('authorization')
      if (page) setOffset(offset + limit)
      setOffset(0)
      if (!auth) auth = ''
      console.log('Cookie: ', auth, typeof auth)
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?dateRange=${duration}&workingDate=${date}&limit=${limit}&offset=${
          page ? offset + limit : offset
        }`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(auth)),
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('response: ', response)
      if (response.ok) {
        const data = await response.json()
        console.log('products are: ', data)
        if (!page) setProductData(data)
        else {
          setProductData({
            ...productData,
            data: [...productData.data, ...data.data],
          })
        }
        setFetching(false)
      } else if (response.status === 401) {
        router.push('/login')
      } else {
        setError('Error occured while fetching')
      }
    } catch (error) {
      console.log('Error Occured')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    setLoadMore(!!Math.floor(productData.count % productData.data.length))
  }, [productData])

  const addNewProduct = (product: Product) => {
    if (!dayjs(today).isSame(dayjs(date))) return
    setProductData({
      ...productData,
      data: [product, ...productData.data],
    })
  }

  const updateProduct = (product: Product) => {
    const allProducts = productData.data.map(q => {
      if (q.id === product.id) return product
      return q
    })
    setProductData({
      ...productData,
      data: allProducts,
    })
  }

  return (
    <>
      {fetching && <Loading />}
      <>
        <h1 className='text-3xl'>Products</h1>

        <p className='my-2'>
          Total Products :{' '}
          <span className='text-xl font-semibold'>{productData.count}</span>
        </p>
        {open && (
          <EditProduct
            product={edit}
            open={open}
            setOpen={setOpen}
            updateProduct={updateProduct}
          />
        )}
        {/* {openDelete && (
          <DeleteDialog
            data={{ id: edit.id, name: edit.productName, type: 'Product' }}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            confirmDelete={confirmDelete}
          />
        )} */}
        <>
          <Filter changeDate={changeDate} changeDuration={changeDuration} />

          <NewProduct addNewProduct={addNewProduct} />

          <ProductTable
            products={productData.data}
            openEditDialog={openEditDialog}
            // openDeleteDialog={openDeleteDialog}
          />

          <ProductsListWithCards
            products={productData.data}
            canLoadMore={loadMore}
            fetchMoreProducts={fetchProducts}
            openEditDialog={openEditDialog}
            // openDeleteDialog={openDeleteDialog}
          />
          <div className='my-5'></div>
        </>
      </>
      {error && <p>{error}</p>}
    </>
  )
}
