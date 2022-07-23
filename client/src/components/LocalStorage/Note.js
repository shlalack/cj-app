import { useState } from "react";
import Form from "./Form";

function Note({ id, value, setter, deleter, placeholder }) {
  const [showAll, setShowAll] = useState(false);

  function expander(expand) {
    setShowAll(expand);
  }

  return (
    <div key={id} className="localStorage-list-item flex-row justify-center">
      <Form
        id={id}
        handler={setter}
        value={value}
        handlerFocus={() => expander(true)}
        handlerBlur={() => expander(false)}
        placeholder={placeholder}
      />
      <div className="note-options">
        <div>
          <button onClick={() => deleter(id)}>X</button>
        </div>
        {showAll ? null : <div className="overlay"></div>}
      </div>
    </div>
  );
}

export default Note;
