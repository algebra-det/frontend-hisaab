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
import Filter from "@/components/transaction/Filter";
import dayjs from "dayjs";
import { dateFormatAPI } from "@/config/format";

export default function MainTransaction() {
  const limit = 10;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);
  const [offset, setOffset] = useState(0);
  const today = dayjs().format(dateFormatAPI);
  const [duration, setDuration] = useState("day");
  const [date, setDate] = useState(today);

  const [transactionData, setTransactionData] = useState({
    data: [],
    totalProfit: 0,
  });
  const [edit, setEdit] = useState({} as Transaction);
  const openEditDialog = (editedTransaction: Transaction) => {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };
  const openDeleteDialog = (editedTransaction: Transaction) => {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpenDelete(true);
    }, 100);
  };
  const changeDuration = (value: string) => {
    setDuration(value);
  };
  const changeDate = (value: string) => {
    setDate(value);
  };

  useEffect(() => {
    fetchTransactions();
  }, [date, duration]);

  const fetchTransactions = async () => {
    let auth = getCookie("authorization");
    if (!auth) auth = "";
    console.log("Cookie: ", auth, typeof auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions?dateRange=${duration}&workingDate=${date}&limit=${limit}&offset=${offset}`,
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
            <Filter changeDate={changeDate} changeDuration={changeDuration} />
            <p className='mt-3 mb-2'>
              Total Profit:{" "}
              <span className='text-xl font-semibold'>
                {thousandSeparator(transactionData.totalProfit)}
              </span>
            </p>

            <NewTransaction refetchTransactions={fetchTransactions} />
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
