import { useState } from "react";
import PreviewRows from "../PreviewRows/PreviewRows";
import { separatorTypes } from "../../constants";
import { clamp, getPreviewArray } from "../../helpers";

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

  const maxRow = fileData?.rows?.length > 0 ? fileData.rows.length - 1 : 0;

  function handleGetRow(e) {
    e.preventDefault();

    const index = Number(e.target.elements["input-rowToShow"].value);

    if (isNaN(index)) {
      return;
    }

    const clamped = clamp(1 + shift, index, fileData.rows.length - shift - 1);
    const previewData = getPreviewArray(
      fileData.rows,
      clamped - shift,
      previewRowsCount
    );
    setPreviewIndex(clamped - shift);
    setPreviewRows(previewData);
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

      const previewData = getPreviewArray(rows, 1, previewRowsCount);
      setPreviewIndex(1);
      setPreviewRows(previewData);
    };

    reader.readAsText(file);
  }

  return (
    <div>
      <div className="flex-row justify-center align-center">
        <input type="file" accept=".csv,.tsv" onChange={handleFileUpload} />
        <div>{loadTime > 0 ? `(in ${loadTime} seconds)` : null}</div>
      </div>

      {fileData.rows.length > 0 ? (
        <div>
          <div>size: {fileData?.size} bytes</div>
          <form onSubmit={handleGetRow}>
            <label htmlFor="input-rowToShow">
              Go to row number (1 - {maxRow.toLocaleString()})
            </label>
            <input id="input-rowToShow" type="text" />
            <button type="submit">Go</button>
          </form>
          <PreviewRows
            previewRows={[fileData.rows[0], ...previewRows]}
            startIndex={previewIndex - 1}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ImportData;
