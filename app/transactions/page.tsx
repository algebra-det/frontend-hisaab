// import getAllTransactions from "@/lib/transaction/getAllTransasctions";
// import { Transaction } from "@/types";
import Transactions from "@/components/transaction/Transactions";

async function page() {
  // const transactionsData: Promise<Transaction[]> = getAllTransactions();
  // const transactions = await transactionsData;

  return (
    <div className='mt-5 grid place-content-center min-w-full w-25'>
      {/* <TransactionTable /> */}
      <Transactions />
    </div>
  );
}

export default page;
