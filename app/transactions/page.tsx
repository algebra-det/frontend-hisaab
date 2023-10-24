// import getAllTransactions from "@/lib/transaction/getAllTransasctions";
// import { Transaction } from "@/types";
import TransactionTable from "@/components/transaction/TransactionTable";

async function page() {
  // const transactionsData: Promise<Transaction[]> = getAllTransactions();
  // const transactions = await transactionsData;

  return (
    <div className='mt-5 grid place-content-center w-25'>
      <TransactionTable />
    </div>
  );
}

export default page;
