'use client'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import TransactionsListWithCards from '@/components/transaction/TransactionsListWithCards'
import NewTransaction from '@/components/transaction/NewTransaction'
import EditTransaction from '@/components/transaction/EditTransaction'
import { useEffect, useState } from 'react'
import { Transaction } from '@/types'
import { thousandSeparator } from '@/utils/currencyFormat'
import Filter from '@/components/common/Filter'
import dayjs from 'dayjs'
import { dateFormatAPI } from '@/config/format'
import TransactionTable from './TransactionTable'
import Loading from '../custom/Loader'
import DeleteDialog from '../common/DeleteDialog'

export default function MainTransaction() {
  const limit = 10
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)
  const [offset, setOffset] = useState(0)
  const today = dayjs().format(dateFormatAPI)
  const [duration, setDuration] = useState('day')
  const [date, setDate] = useState(today)
  const [loadMore, setLoadMore] = useState(false)

  const [transactionData, setTransactionData] = useState({
    data: [] as Transaction[],
    totalProfit: 0,
    count: 0,
  })
  const [edit, setEdit] = useState({} as Transaction)
  const openEditDialog = (editedTransaction: Transaction) => {
    setEdit(editedTransaction)
    setTimeout(() => {
      setOpen(true)
    }, 100)
  }
  const openDeleteDialog = (editedTransaction: Transaction) => {
    setEdit(editedTransaction)
    setTimeout(() => {
      setOpenDelete(true)
    }, 100)
  }
  const changeDuration = (value: string) => {
    setDuration(value)
  }
  const changeDate = (value: string) => {
    setDate(value)
  }

  useEffect(() => {
    fetchTransactions()
  }, [date, duration])

  const fetchTransactions = async (page?: boolean) => {
    try {
      setFetching(true)
      let auth = getCookie('authorization')
      if (page) setOffset(offset + limit)
      else setOffset(0)
      if (!auth) auth = ''
      console.log('Cookie: ', auth, typeof auth)
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/transactions?dateRange=${duration}&workingDate=${date}&limit=${limit}&offset=${
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
        console.log('Transactions are: ', data)
        if (!page) setTransactionData(data)
        else {
          setTransactionData({
            ...transactionData,
            data: [...transactionData.data, ...data.data],
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

  const confirmDelete = async () => {
    try {
      setFetching(true)
      let auth = getCookie('authorization')
      if (!auth) auth = ''

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${edit.id}`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(auth)),
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }
      )
      fetchTransactions()
      setOpenDelete(false)
    } catch (error) {
      console.log('Error: ', error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    setLoadMore(
      !!Math.floor(transactionData.count % transactionData.data.length)
    )
  }, [transactionData])

  const addNewTransaction = (transaction: Transaction) => {
    if (!dayjs(today).isSame(dayjs(date))) return
    const newProfit = transactionData.totalProfit + transaction.profit
    setTransactionData({
      ...transactionData,
      data: [transaction, ...transactionData.data],
      totalProfit: newProfit,
    })
  }

  const updateTransaction = (transaction: Transaction) => {
    let oldTransaction = {} as Transaction
    const allTransactions = transactionData.data.map(q => {
      if (q.id === transaction.id) {
        oldTransaction = q
        return transaction
      }
      return q
    })
    const newProfit =
      transactionData.totalProfit - oldTransaction.profit + transaction.profit
    setTransactionData({
      ...transactionData,
      data: allTransactions,
      totalProfit: newProfit,
    })
  }

  return (
    <>
      {fetching && <Loading />}
      <>
        <h1 className='text-3xl'>Transactions</h1>

        <div className='flex justify-between items-center my-2'>
          <p>
            Total Profit:{' '}
            <span className='text-xl font-semibold'>
              {thousandSeparator(transactionData.totalProfit)}
            </span>
          </p>
          <NewTransaction addNewTransaction={addNewTransaction} />
        </div>
        {open && (
          <EditTransaction
            transaction={edit}
            open={open}
            setOpen={setOpen}
            updateTransaction={updateTransaction}
          />
        )}
        {openDelete && (
          <DeleteDialog
            data={{ id: edit.id, name: edit.productName, type: 'Transaction' }}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            confirmDelete={confirmDelete}
          />
        )}
        <>
          <Filter changeDate={changeDate} changeDuration={changeDuration} />

          <TransactionTable
            transactions={transactionData.data}
            openEditDialog={openEditDialog}
            openDeleteDialog={openDeleteDialog}
          />

          <TransactionsListWithCards
            transactions={transactionData.data}
            canLoadMore={loadMore}
            fetchMoreTransactions={fetchTransactions}
            openEditDialog={openEditDialog}
            openDeleteDialog={openDeleteDialog}
          />
          <div className='my-5'></div>
        </>
      </>
      {error && <p>{error}</p>}
    </>
  )
}
