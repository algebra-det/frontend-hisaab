"use client";
import Transactions from "@/components/transaction/Transactions";
import NewTransaction from "@/components/transaction/NewTransaction";
import EditTransaction from "@/components/transaction/EditTransaction";
// import TransactionTable from "@/components/transaction/TransactionTable";
import { useState } from "react";
import { Transaction } from "@/types";

export default function MainTransaction() {
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
  const [open, setOpen] = useState(false);
  function openEditDialog(editedTransaction: Transaction) {
    setEdit(editedTransaction);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }

  return (
    <>
      {/* <TransactionTable /> */}
      <NewTransaction />
      {open && (
        <EditTransaction transaction={edit} open={open} setOpen={setOpen} />
      )}
      <Transactions openEditDialog={openEditDialog} />
    </>
  );
}
