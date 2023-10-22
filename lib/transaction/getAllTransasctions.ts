import { redirect } from "next/navigation";
const fetchData = async () => {
  const res = await fetch(`${process.env.API_URL}/transactions`, {
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("tran: ", res.ok, res.status);
  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error("Failed to fetch data");

  const jsonResponse = await res.json();
  console.log("tran: ", jsonResponse);
  return jsonResponse;
};
export default fetchData;
