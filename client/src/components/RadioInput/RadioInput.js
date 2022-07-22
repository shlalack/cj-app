import React from "react";
import "./RadioInput.css";

function RadioInput({ handler, selected, options, groupName = "radioGroup" }) {
  return (
    <div className="flex-row justify-center">
      {options.map((option) => {
        return (
          <div key={option} className="flex-row align-center radio-field-item">
            <input
              type="radio"
              id={option}
              value={option}
              name={groupName}
              onChange={handler}
              defaultChecked={selected === option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}

export default RadioInput;
