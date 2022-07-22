import React from "react";

function Sort({
  data,
  sorter,
  sortFields,
  sortDuration,
  sortDirection,
  callback,
}) {
  if (!Array.isArray(data)) {
    return null;
  }

  function handleSort(e) {
    const { id } = e.target;
    sorter(data, {
      sortField: id,
      hasHeaderRow: true,
      callback: callback,
      sortDirection: sortDirection,
    });
  }

  return (
    <div>
      {sortFields && sortFields.length
        ? sortFields.map((field, idx) => {
            return (
              <button key={field} id={idx} onClick={handleSort}>
                Sort by {field}
              </button>
            );
          })
        : null}
      <div>
        {sortDuration ? <span>({sortDuration / 1000}) seconds</span> : null}
      </div>
    </div>
  );
}

export default Sort;
