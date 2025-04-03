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
// This is the home page where you can view and manage stocks. You can add, edit, or delete stocks as needed. More features will be added soon!
// Add your stock management components here
