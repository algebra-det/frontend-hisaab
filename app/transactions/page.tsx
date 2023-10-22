import getAllTransactions from "@/lib/transaction/getAllTransasctions";
import { Transaction } from "@/types";

async function page() {
  const transactionsData: Promise<Transaction[]> = getAllTransactions();
  const transactions = await transactionsData;
  console.log("transactions: ", transactions);

  return (
    <div className='mt-5'>
      <h2>No Transactions found.</h2>
    </div>
  );
}

export default page;
