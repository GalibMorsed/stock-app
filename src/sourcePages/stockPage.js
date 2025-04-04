import React from "react";
import StockScreen from "../stockComponents/stockScreen";
import StockSidebar from "../stockComponents/stockSidebar";
import StockNav from "../stockComponents/stockNav";

export default function stockPage() {
  return (
    <div>
      <StockScreen />
      <StockSidebar />
      <StockNav />
    </div>
  );
}
// This is the stock page where you can view and manage stocks. You can add, edit, or delete stocks as needed. More features will be added soon!
// Add your stock management components here
