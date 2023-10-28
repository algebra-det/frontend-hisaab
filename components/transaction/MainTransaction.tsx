"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import TransactionsListWithCards from "@/components/transaction/TransactionsListWithCards";
import NewTransaction from "@/components/transaction/NewTransaction";
import EditTransaction from "@/components/transaction/EditTransaction";
// import TransactionTable from "@/components/transaction/TransactionTable";
import { useEffect, useState } from "react";
import { Transaction } from "@/types";
import DeleteTransaction from "./DeleteTransaction";
import { thousandSeparator } from "@/utils/currencyFormat";

export default function MainTransaction() {
  const limit = 2;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);
  const [offset, setOffset] = useState(0);
  const [transactionData, setTransactionData] = useState({
    data: [],
    totalProfit: 0,
  });
  const [edit, setEdit] = useState({} as Transaction);
  function openEditDialog(editedTransaction: Transaction) {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }
  function openDeleteDialog(editedTransaction: Transaction) {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpenDelete(true);
    }, 100);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    let auth = getCookie("authorization");
    if (!auth) auth = "";
    console.log("Cookie: ", auth, typeof auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions?dateRange=year`,
      {
        headers: {
          Authorization: JSON.parse(JSON.stringify(auth)),
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response: ", response);
    if (response.ok) {
      const data = await response.json();
      console.log("Transactions are: ", data);
      setTransactionData(data);
      setFetching(false);
    } else if (response.status === 401) {
      router.push("/login");
    } else {
      setError("Error occured while fetching");
    }
  };

  return (
    <>
      {!fetching && (
        <>
          <h1 className='text-3xl mb-4'>Transactions</h1>
          {/* <TransactionTable /> */}
          <NewTransaction refetchTransactions={fetchTransactions} />
          {open && (
            <EditTransaction
              transaction={edit}
              open={open}
              setOpen={setOpen}
              refetchTransactions={fetchTransactions}
            />
          )}
          {openDelete && (
            <DeleteTransaction
              transaction={edit}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              refetchTransactions={fetchTransactions}
            />
          )}
          <>
            <p className='mt-3 mb-2'>
              Total Profit:{" "}
              <span className='text-xl'>
                {thousandSeparator(transactionData.totalProfit)}
              </span>
            </p>
            <TransactionsListWithCards
              transactions={transactionData.data}
              openEditDialog={openEditDialog}
              openDeleteDialog={openDeleteDialog}
            />
          </>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
