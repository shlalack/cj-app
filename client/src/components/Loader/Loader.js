import React from "react";
import "./Loader.css";

function Loader({ children, loading }) {
  return (
    <div className="loader">
      {children}
      {loading ? (
        <div className="loader-overlay">
          <div>Loading...</div>
        </div>
      ) : null}
    </div>
  );
}

export default Loader;
