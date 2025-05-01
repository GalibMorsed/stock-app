import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} StockNest Platform. All rights
            reserved to - <strong>Galib Morsed</strong>.
          </p>
          <nav>
            <ul>
              <li>
                <Link to="/" className="footer-link">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/" className="footer-link">
                  Contact Me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
