import { useState } from "react";

export default function useLocalStorage(mainKey) {
  const [values, setValues] = useState(() => {
    try {
      if (!localStorage.getItem(mainKey)) {
        localStorage.setItem(mainKey, JSON.stringify({}));
      }
      const items = localStorage.getItem(mainKey);
      return JSON.parse(items);
    } catch (error) {
      console.log("Error in getItem()", error);
    }
  });

  function setValue(key, value) {
    try {
      if (!value) return;

      const newValues = { ...values };
      if (key && key in values) {
        newValues[key] = value;
      } else {
        const newKey = Date.now().toString(36);
        newValues[newKey] = value;
      }
      setValues(newValues);
      localStorage.setItem(mainKey, JSON.stringify(newValues));
    } catch (error) {
      console.log("Error in setValue()", error);
    }
  }

  function deleteValue(key) {
    try {
      if (key && key in values) {
        const newValues = { ...values };
        delete newValues[key];
        setValues(newValues);
        localStorage.setItem(mainKey, JSON.stringify(newValues));
      }
    } catch (error) {
      console.log("Error in deleteValue()", error);
    }
  }

  return [values, setValue, deleteValue];
}
