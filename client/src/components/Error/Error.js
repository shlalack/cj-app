import "./Error.css";

function Error({ children }) {
  return children ? <div className="error">{children}</div> : null;
}

export default Error;
