import { useRef, useState } from "react";

function Form({ handler, id, value, handlerFocus, handlerBlur, placeholder }) {
  const inputRef = useRef(null);

  function handleFocus() {
    handlerFocus && handlerFocus();
  }

  function handleBlur() {
    // This is a terrible hack to allow the delete function to execute before the onBlur
    setTimeout(() => {
      handlerBlur && handlerBlur();
    }, 100);
  }

  function handleSubmit(e) {
    handler(e);
    if (!id && !value) {
      inputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id={id}
        type="text"
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={value ? value : ""}
        placeholder={placeholder || ""}
      />
    </form>
  );
}

export default Form;
