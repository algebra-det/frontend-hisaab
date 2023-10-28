"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import TransactionsListWithCards from "@/components/transaction/TransactionsListWithCards";
import NewTransaction from "@/components/transaction/NewTransaction";
import EditTransaction from "@/components/transaction/EditTransaction";
// import TransactionTable from "@/components/transaction/TransactionTable";
import { useEffect, useState } from "react";
import { Transaction } from "@/types";

export default function MainTransaction() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);
  const [transactionData, setTransactionData] = useState({
    data: [],
    totalProfit: 0,
  });
  const [edit, setEdit] = useState({
    id: 9,
    productName: "fzs 4",
    purchasePrice: 1000,
    sellingPrice: 1300,
    profit: 300,
    createdAt: "2023-10-22T18:47:29.703Z",
    updatedAt: "2023-10-22T18:47:29.703Z",
    createdBy: 2,
  });
  function openEditDialog(editedTransaction: Transaction) {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const auth = getCookie("authorization");
    console.log("Cookie: ", auth, typeof auth);
    const response = await fetch("http://localhost:8000/transactions", {
      headers: {
        authorization: `${auth}`,
      },
    });
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
      {/* <TransactionTable /> */}
      <NewTransaction />
      {open && (
        <EditTransaction transaction={edit} open={open} setOpen={setOpen} />
      )}
      {error && <p>{error}</p>}
      {!fetching && (
        <>
          <p className='mt-3 mb-2'>
            Total Profit: &#8377;{transactionData.totalProfit}
          </p>
          <TransactionsListWithCards
            transactions={transactionData.data}
            openEditDialog={openEditDialog}
          />
        </>
      )}
    </>
  );
}
