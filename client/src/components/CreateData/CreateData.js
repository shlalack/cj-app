import { useState } from "react";
import PreviewRows from "../PreviewRows/PreviewRows";
import { dataTypes, separatorTypes } from "../../constants";
import { getPreviewData } from "../../helpers";

const rowCountOptions = [10, 100, 1000, 10000, 100000, 1000000];
const previewRowsCount = 5;

function pad(number) {
  const str = number.toString();
  return str.length === 1 ? `0${str}` : `${str}`;
}

function createDownloadName() {
  const now = new Date();
  const isoString = now.toISOString();
  const isoDate = isoString.split("T")[0].replaceAll("-", "");
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const time_ = [pad(hours), pad(minutes), pad(seconds)].join("");
  const date = [isoDate, time_].join("_");
  return `data_${date}`;
}

function randInt(min, max) {
  return Number(Math.floor(Math.random() * (max - min + 1)) + min);
}

function createAlphanumeric() {
  return Math.random().toString(36).substring(2);
}
function createString(length) {
  const len = length ? length : randInt(3, 10);
  const letters = [];

  for (let i = 0; i <= len; i++) {
    letters.push(String.fromCodePoint(Math.floor(Math.random() * 26) + 97));
  }
  return letters.join("");
}
function createInteger(min = 0, max = 100) {
  return randInt(min, max);
}
function createDecimal() {
  return Number(Math.random()) + Number(randInt(0, 100));
}
function createDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 100);

  return new Date(randInt(start.valueOf(), Date.now()))
    .toISOString()
    .split("T")[0];
}

function generatorRow(columnKeys, separator) {
  let strArray = [];
  columnKeys.forEach((key) => {
    switch (key) {
      case dataTypes.alphaNumeric:
        strArray.push(createAlphanumeric());
        break;
      case dataTypes.string:
        strArray.push(createString());
        break;
      case dataTypes.integer:
        strArray.push(createInteger());
        break;
      case dataTypes.decimal:
        strArray.push(createDecimal());
        break;
      case dataTypes.date:
        strArray.push(createDate());
        break;

      default:
        break;
    }
  });
  return strArray.join(separator);
}
function generateRows(generatorRow, count, separator) {
  const rows = [
    { title: "Name", type: dataTypes.string },
    { title: "ID", type: dataTypes.alphaNumeric },
    { title: "Age", type: dataTypes.integer },
    { title: "Rating", type: dataTypes.decimal },
    { title: "Date", type: dataTypes.date },
  ];
  const rowTypes = rows.map((row) => row.type);
  const outArray = [rows.map((row) => row.title).join(separator)];

  for (let i = 0; i < count; i++) {
    outArray.push(generatorRow(rowTypes, separator));
  }

  return outArray.join("\n");
}

async function createData(rowCount, setObjectUrl, setPreviewRows, fileType) {
  const startTime = Date.now();
  const separator = separatorTypes[fileType].separator;
  const data = generateRows(generatorRow, rowCount, separator);
  //   console.log("data[0]", data.substring(0, 200));

  const previewData = getPreviewData(data, previewRowsCount, separator);
  setPreviewRows(previewData);

  const dataBlob = new File([data], `data.${fileType}`, {
    type: separatorTypes[fileType].mimeType,
  });

  const endTime = Date.now();
  const timeDiff = endTime - startTime;
  console.log("duration", timeDiff / 1000, "seconds");

  const url = URL.createObjectURL(dataBlob);
  console.log("url", url);
  setObjectUrl(url);
}

function CreateData() {
  const [objectUrl, setObjectUrl] = useState("");
  const [previewRows, setPreviewRows] = useState(null);
  const [fileType, setFileType] = useState(Object.keys(separatorTypes)[1]);
  const [rowCount, setRowCount] = useState(rowCountOptions[0]);
  const [downloadName, setDownloadName] = useState(createDownloadName());

  function handleCreateData() {
    createData(rowCount, setObjectUrl, setPreviewRows, fileType);
    setDownloadName(createDownloadName());
  }

  return (
    <div>
      <div>
        <label htmlFor="fileType">
          <select
            id="fileType"
            onChange={(e) => setFileType(e.target.value)}
            value={fileType}
          >
            {Object.keys(separatorTypes).map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="rowCount">
          <select
            id="rowCount"
            onChange={(e) => setRowCount(Number(e.target.value))}
            value={rowCount}
          >
            {rowCountOptions.map((count) => {
              return (
                <option value={count} key={count}>
                  {count.toLocaleString()}
                </option>
              );
            })}
          </select>
        </label>
        <button onClick={handleCreateData}>Create Data</button>
      </div>
      {/* <div>{objectUrl ? JSON.stringify(objectUrl, null, 2) : null}</div> */}
      {objectUrl ? (
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => setDownloadName(e.target.value)}
              value={downloadName}
            />
            <span>.{fileType}</span>
          </div>
          <a href={objectUrl} download={`${downloadName}.${fileType}`}>
            Download
          </a>
        </div>
      ) : null}
      <PreviewRows previewRows={previewRows} startIndex={0} />
    </div>
  );
}

export default CreateData;
