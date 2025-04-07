import React, { useState } from "react";
import StockScreen from "../stockComponents/stockScreen";
import StockSidebar from "../stockComponents/stockSidebar";
import StockNav from "../stockComponents/stockNav";
import CreateTable from "../stockComponents/createTable";

export default function StockPage() {
  const [showCreateTable, setShowCreateTable] = useState(false);

  return (
    <div>
      <StockNav onCreateTable={() => setShowCreateTable(true)} />
      <StockSidebar />
      {showCreateTable ? (
        <CreateTable onFinish={() => setShowCreateTable(false)} />
      ) : (
        <StockScreen />
      )}
    </div>
  );
}

// This is the stock page where you can view and manage stocks. You can add, edit, or delete stocks as needed. More features will be added soon!
// Add your stock management components here
