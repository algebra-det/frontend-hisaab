import MainTransaction from "@/components/transaction/MainTransaction";

async function page() {
  return (
    <div className='mt-5 grid place-content-center min-w-full w-25'>
      <h1 className='text-3xl mb-4'>Transactions</h1>
      <MainTransaction />
    </div>
  );
}

export default page;
