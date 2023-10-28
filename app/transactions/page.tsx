// import getAllTransactions from "@/lib/transaction/getAllTransasctions";
// import { Transaction } from "@/types";
import Transactions from "@/components/transaction/Transactions";
import NewTransaction from "@/components/transaction/NewTransaction";

async function page() {
  // const transactionsData: Promise<Transaction[]> = getAllTransactions();
  // const transactions = await transactionsData;

  return (
    <div className='mt-5 grid place-content-center min-w-full w-25'>
      {/* <TransactionTable /> */}

      <h1 className='text-3xl mb-4'>Transactions</h1>
      <NewTransaction />
      <Transactions />
    </div>
  );
}

export default page;
