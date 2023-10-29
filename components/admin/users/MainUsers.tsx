'use client'
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

import { User } from "@/types";

function MainUsers() {
  const router = useRouter()
  const [users, setUsers] = useState([] as User[])
  const [fetcing, setFetching] = useState(true)
  const [error, setError] = useState('' as string)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    let auth = getCookie("authorization");
    if (!auth) auth = "";
    console.log("Cookie: ", auth, typeof auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
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
      setUsers(data);
      setFetching(false);
    } else if (response.status === 401) {
      router.push("/login");
    } else {
      setError("Error occured while fetching");
    }
  };
  return (
    <div>MainUsers</div>
  )
}

export default MainUsers;