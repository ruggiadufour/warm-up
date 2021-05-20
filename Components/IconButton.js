import React from "react";

export default function IconButton({label, tooltip, onClick}) {
  return (
    <span
      className="d-inline-block"
      tabIndex="0"
      data-bs-toggle="tooltip"
      title={tooltip}
    >
      <button className="icon-button" type="button" onClick={onClick}>
        {label}
      </button>
    </span>
  );
}
