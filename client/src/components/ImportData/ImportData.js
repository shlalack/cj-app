import { useState } from "react";
import PreviewRows from "../PreviewRows/PreviewRows";
import Loader from "../Loader/Loader";
import Sort from "../Sort/Sort";
import { separatorTypes } from "../../constants";
import { clamp, getPreviewArray } from "../../helpers";
import useSort from "../../hooks/useSort";

const previewRowsCount = 5;
const shift = Math.floor(previewRowsCount / 2);

function analyseData(dataString, separator) {
  const rows = dataString.split("\n");
  const cells = rows.map((row) => {
    return row.split(separator);
  });

  return cells;
}

const initialFileData = {
  name: "",
  size: 0,
  type: "",
  dataString: "",
  rows: [],
};

function ImportData() {
  const [fileData, setFileData] = useState(initialFileData);
  const [previewIndex, setPreviewIndex] = useState(1);
  const [previewRows, setPreviewRows] = useState(null);
  const [loadTime, setLoadTime] = useState(0);
  const [sortFields, setSortFields] = useState(null);

  const [{ sorted, sorting, duration }, sorter] = useSort();

  const maxRow = fileData?.rows?.length > 0 ? fileData.rows.length - 1 : 0;

  function handlePreview(rowsToPreview, startIndex) {
    const previewData = getPreviewArray(
      rowsToPreview,
      startIndex,
      previewRowsCount
    );
    setPreviewIndex(startIndex);
    setPreviewRows(previewData);
  }

  function handleGetRow(e) {
    e.preventDefault();

    const index = Number(e.target.elements["input-rowToShow"].value);

    if (isNaN(index)) {
      return;
    }

    const clamped = clamp(1 + shift, index, fileData.rows.length - shift - 1);
    const shiftedIndex = clamped - shift;
    handlePreview(fileData.rows, shiftedIndex);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const fileNameArray = file.name.split(".");
    const extension = fileNameArray[fileNameArray.length - 1];
    const separator = separatorTypes[extension].separator;

    setFileData({
      ...fileData,
      name: file.name,
      size: file.size,
      type: file.type,
    });

    let startTime = Date.now();

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target.result;

      const rows = analyseData(result, separator);

      setFileData({
        ...fileData,
        name: file.name,
        size: file.size,
        type: file.type,
        dataString: result,
        rows,
      });
      let endTime = Date.now();
      let diff = endTime - startTime;
      setLoadTime(diff / 1000);

      setSortFields(rows[0]);

      handlePreview(rows, 1);
    };

    reader.readAsText(file);
  }

  const rowsToShow = sorted ? sorted : fileData.rows;

  return (
    <div>
      <Loader loading={sorting} message={"Sorting..."}>
        <div className="flex-row justify-center align-center">
          <input type="file" accept=".csv,.tsv" onChange={handleFileUpload} />
          <div>{loadTime > 0 ? `(in ${loadTime} seconds)` : null}</div>
        </div>

        {rowsToShow.length > 0 ? (
          <div>
            <div>size: {fileData?.size} bytes</div>
            <form onSubmit={handleGetRow}>
              <label htmlFor="input-rowToShow">
                Go to row number (1 - {maxRow.toLocaleString()})
              </label>
              <input id="input-rowToShow" type="text" />
              <button type="submit">Go</button>
            </form>
            <Sort
              data={fileData.rows}
              sorter={sorter}
              sortFields={sortFields}
              sortDuration={duration}
              callback={handlePreview}
            />
            <PreviewRows
              previewRows={[rowsToShow[0], ...previewRows]}
              startIndex={previewIndex - 1}
            />
          </div>
        ) : null}
      </Loader>
    </div>
  );
}

export default ImportData;
