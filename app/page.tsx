import getIndexData from '@/lib/home/getIndex'
import Link from 'next/link'

interface indexType {
  message: String
}
export default async function Home() {
  const indexCall: Promise<indexType> = getIndexData()
  const indexData = await indexCall
  return (
    <div className='grid place-content-center mt-4'>
      <h2 className='mt-4'>
        <p className='text-2xl'>{indexData.message}</p>
        Go to your{' '}
        <Link className='underline' href='/transactions'>
          Transactions
        </Link>{' '}
      </h2>
    </div>
  )
}
