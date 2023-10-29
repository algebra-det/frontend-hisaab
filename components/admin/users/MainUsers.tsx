"use client";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

import { AdminUser } from "@/types";
import UsersTable from "./UsersTable";

function MainUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([] as AdminUser[]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("" as string);

  const handleUserActiveChange = async (value: boolean, user: AdminUser) => {
    let auth = getCookie("authorization");
    if (!auth) auth = "";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${user.id}`,
        {
          headers: {
            Authorization: JSON.parse(JSON.stringify(auth)),
            "content-type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            active: value,
          }),
        }
      );
      let updatedUser = await response.json();
      if (response.ok) {
        updatedUser = updatedUser.data;
        console.log("Response object: ", response.status, updatedUser);
        const allUsers = users.map((q) => {
          if (q.id === updatedUser.id) return updatedUser;
          return q;
        });
        console.log("All User: ", allUsers);
        setUsers(allUsers);
      }
    } catch (error) {
      console.log("Error while loggin in: ", error);
    }
    console.log("Boolean value: ", value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      setUsers(data.data);
      setFetching(false);
    } else if (response.status === 401) {
      router.push("/login");
    } else {
      setError("Error occured while fetching");
    }
  };
  return (
    <div>
      {!fetching && (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <UsersTable
              users={users}
              handleUserActiveChange={handleUserActiveChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MainUsers;
