import { useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetcher({ url, method, body }) {
    if (!url) return;

    try {
      setLoading(true);
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        console.log("response", response);
        setError(response.statusText);
        return;
      }

      const json = await response.json();

      setData(json);
      setError(null);
    } catch (error) {
      setError("Network request failed.");
    } finally {
      setLoading(false);
    }
  }

  return [{ data, loading, error }, fetcher];
}

export default useFetch;
