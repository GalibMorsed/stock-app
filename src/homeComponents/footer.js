import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} StockNest Company. All rights are
            reserved to Galib Morsed.
          </p>
          <nav>
            <ul>
              <li>
                <Link to="/">About Me</Link>
              </li>
              <li>
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/">Contact Me</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
