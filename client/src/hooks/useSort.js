import { useState } from "react";
import { getValueType } from "../helpers";

function pause(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

const stringSort = (columnIndex) => (a, b) =>
  a[columnIndex] === b[columnIndex]
    ? 0
    : a[columnIndex] > b[columnIndex]
    ? 1
    : -1;

const numberSort = (columnIndex) => (a, b) =>
  Number(a[columnIndex]) - Number(b[columnIndex]);

const sortFunctions = {
  undefined: stringSort,
  number: numberSort,
  string: stringSort,
  date: stringSort,
};

function runSort(sortFunction) {
  return new Promise((resolve, reject) => {
    try {
      const sorted = sortFunction();
      resolve(sorted);
    } catch (error) {
      reject(error);
    }
  });
}

function useSort() {
  const [sorted, setSorted] = useState(null);
  const [sorting, setSorting] = useState(false);
  const [duration, setDuration] = useState(0);

  async function sorter(array, { sortField, hasHeaderRow, callback }) {
    setSorting(true);

    // This pause is added because it is non-blocking and
    // gives a chance for React to do its thing
    // the sort blocks React
    await pause(100);

    const startTime = Date.now();

    const firstCell = array[1][sortField];
    const dataType = getValueType(firstCell);

    // Get the column index to sort by
    const columnIndex = sortField;

    // Remove header
    let rowsToSort = array;
    let headerRow = null;
    if (hasHeaderRow) {
      // eslint-disable-next-line
      const [header, ...rest] = array;
      headerRow = header;
      rowsToSort = rest;
    }

    // Define sorting function
    const sortBy = sortFunctions[dataType](columnIndex);

    // Get sorted data
    const sortedRows = await runSort(
      sortBy ? () => rowsToSort.sort(sortBy) : () => rowsToSort.sort()
    );

    const endTime = Date.now();
    const diff = endTime - startTime;

    // Set sorted data
    setSorted([headerRow, ...sortedRows]);
    setSorting(false);
    setDuration(diff);

    // Run callback to get preview data
    callback(sortedRows, 1);
  }

  return [{ sorted, sorting, duration }, sorter];
}

export default useSort;
