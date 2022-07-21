import React from "react";

function PreviewRows({ previewRows, startIndex }) {
  return (
    <div>
      {Array.isArray(previewRows) ? (
        <div>
          <h5>Preview</h5>
          <table className="">
            <thead>
              <tr key="">
                <th>Row</th>
                {previewRows[0].map((cell, idx) => {
                  return <th key={idx}>{cell}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, idx) => {
                return idx === 0 ? null : (
                  <tr key={idx} className="">
                    <td>{idx + startIndex}</td>
                    {row.map((cell, idx2) => {
                      return <td key={idx2}>{cell}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default PreviewRows;
