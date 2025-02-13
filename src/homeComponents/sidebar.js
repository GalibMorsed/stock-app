import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <ul className="note-list">
          <li>
            <Link to="stockPage"></Link>
          </li>
        </ul>
      </div>
    </>
  );
}
