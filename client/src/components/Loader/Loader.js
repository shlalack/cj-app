import React from "react";
import "./Loader.css";

function Loader({ children, loading, message }) {
  return (
    <div className="loader">
      {children}
      {loading ? (
        <div className="loader-overlay">
          <div>{message}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Loader;
