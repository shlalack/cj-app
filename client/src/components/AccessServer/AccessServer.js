import { useState } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import useFetch from "../../hooks/useFetch";

function AccessServer() {
  const [text, setText] = useState("Enter any random text");
  const [{ data, loading, error }, fetcher] = useFetch();

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSendText(e) {
    e.preventDefault();
    fetcher({ url: "/text", method: "POST", body: { text } });
  }

  return (
    <div>
      <form onSubmit={handleSendText}>
        <input type="text" onChange={handleTextChange} value={text} />
        <button type="submit">Go</button>
      </form>
      <div>
        <Loader loading={loading}>
          <Error>{error}</Error>

          {data ? (
            <div>
              <div>{data?.text}</div>
              <div>{data?.time}</div>
            </div>
          ) : null}
        </Loader>
      </div>
    </div>
  );
}

export default AccessServer;
