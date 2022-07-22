import Form from "./Form";
import Note from "./Note";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./LocalStorage.css";

function LocalStorage() {
  const [values, setValue, deleteValue] = useLocalStorage("cj-app");

  function handleKeyValueChange(e) {
    e.preventDefault();
    const input = e.target.elements[0];
    const newValue = input.value;
    const id = input.id;
    setValue(id, newValue);
  }

  return (
    <div className="local-storage flex-col align-center">
      <div className="note-primary">
        <Note
          id={null}
          setter={handleKeyValueChange}
          placeholder="Add new note"
        />
      </div>
      {/* <div>
        <Form handler={handleKeyValueChange} id={null} />
      </div> */}
      {values &&
        Object.keys(values).map((key) => {
          return (
            <Note
              key={key}
              id={key}
              value={values[key]}
              setter={handleKeyValueChange}
              deleter={deleteValue}
            />
          );
        })}
    </div>
  );
}

export default LocalStorage;
