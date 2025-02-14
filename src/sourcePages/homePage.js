import React from "react";
import MainPgae from "../homeComponents/mainPage";
import Navbar from "../homeComponents/navbar";
import Sidebar from "../homeComponents/sidebar";

export default function homePage() {
  return (
    <div>
      <MainPgae />
      <Navbar />
      <Sidebar />
    </div>
  );
}
