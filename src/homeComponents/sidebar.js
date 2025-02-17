import React from "react";

export default function Sidebar({ close }) {
  return (
    <>
      <div className="sidebar-nav" onClick={close}>
        <h1 className="web-name">StockNest</h1>
        <div className="sidebar">
          <ul className="note-list">
            <h2>Created Stocks</h2>
            <li>gakaDJHGKHDALSKC</li>
            <li>dlcskhdbcjahvak</li>
            <li>askhdbcakshdbla</li>
            <li>scdklbcksdhbcjascv</li>
            <li>78946512379456132</li>
            <li>wertyuiknbvcxzsdfghjmdsgdyacbh</li>
            <li>gakaDJHGKHDALSKC</li>
            <li>dlcskhdbcjahvak</li>
          </ul>
        </div>
      </div>
    </>
  );
}
