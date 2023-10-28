import TransactionCard from "./TransactionCard";

import { Transaction } from "@/types";
function TransactionsListWithCards({
  transactions,
  openEditDialog,
}: {
  transactions: Transaction[];
  openEditDialog: (transaction: Transaction) => void;
}) {
  return (
    <>
      <div className='overflow-auto w-80 sm:h-5/6 sm:w-96'>
        <div>
          {transactions.map((q) => (
            <div className='mt-2' key={q.id}>
              <TransactionCard
                transaction={q}
                openEditDialog={openEditDialog}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TransactionsListWithCards;