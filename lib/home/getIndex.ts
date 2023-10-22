const getIndexData = async () => {
  console.log("Process: ", process.env.API_URL);
  const res = await fetch(`${process.env.API_URL}`, {
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
  });
  console.log("tran: ", res.ok, res.status);
  if (!res.ok) throw new Error("Failed to fetch data");

  const jsonResponse = await res.json();
  console.log("index Data: ", jsonResponse);
  return jsonResponse;
};
export default getIndexData;
