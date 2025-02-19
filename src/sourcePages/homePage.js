import React from "react";
import MainPage from "../homeComponents/mainPage";
import Navbar from "../homeComponents/navbar";
import Sidebar from "../homeComponents/sidebar";
import Footer from "../homeComponents/footer";

export default function homePage() {
  return (
    <div>
      <MainPage />
      <Navbar />
      <Sidebar />
      <Footer />
    </div>
  );
}
