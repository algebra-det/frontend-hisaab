import TransactionCard from "./TransactionCard";
import dummyTransactions from "@/lib/dummyTransactions";
import { Transaction } from "@/types";
function Transactions() {
  const transactions: Transaction[] = dummyTransactions;
  return (
    <>
      <div className='overflow-auto sm:h-2/5 sm:w-96'>
        <div>
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
