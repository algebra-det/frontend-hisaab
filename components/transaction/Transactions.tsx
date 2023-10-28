import TransactionCard from "./TransactionCard";
import dummyTransactions from "@/lib/dummyTransactions";
import { Transaction } from "@/types";
function Transactions() {
  const transactions: Transaction[] = dummyTransactions;
  return (
    <>
      <h2>Transactions</h2>
      <div className='overflow-auto sm:h-2/5 sm:w-96'>
        <div className='mr-10'>
          {transactions.map((q) => (
            <div className='mt-2' key={q.id}>
              <TransactionCard transaction={q} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Transactions;
