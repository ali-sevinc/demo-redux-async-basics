import { useCallback, useState } from "react";

function useFirebase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async function (
    fetchData = {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
      },
    },
    URL,
  ) {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(URL, fetchData);
      if (!res.ok) throw new Error("Something went wrong");
      const data = res.json();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, fetchData };
}

export default useFirebase;
