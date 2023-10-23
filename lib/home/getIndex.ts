const getIndexData = async () => {
  const res = await fetch(`${process.env.API_URL}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
    credentials: "include",
  });
  console.log("tran: ", res.ok, res.status);
  if (!res.ok) throw new Error("Failed to fetch data");

  const jsonResponse = await res.json();
  console.log("index Data: ", jsonResponse);
  return jsonResponse;
};
export default getIndexData;
