import getIndexData from "@/lib/home/getIndex";

interface indexType {
  message: String;
}
export default async function Home() {
  const indexCall: Promise<indexType> = getIndexData();
  const indexData = await indexCall;
  return (
    <div className='grid place-content-center mt-4'>
      <h2>List your transactions</h2>
      <p className='mt-4'>{indexData.message}</p>
    </div>
  );
}
