import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionCard from "./TransactionCard";

import { Transaction } from "@/types";
function TransactionsListWithCards({
  transactions,
  openEditDialog,
  openDeleteDialog,
}: {
  transactions: Transaction[];
  openEditDialog: (transaction: Transaction) => void;
  openDeleteDialog: (transaction: Transaction) => void;
}) {
  return (
    <>
      <div className='w-80 sm:w-96'>
        <div>
          <ScrollArea className='h-96 rounded-xl border p-4'>
            {transactions.map((q) => (
              <div className='mt-2' key={q.id}>
                <TransactionCard
                  transaction={q}
                  openEditDialog={openEditDialog}
                  openDeleteDialog={openDeleteDialog}
                />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default TransactionsListWithCards;
