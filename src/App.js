import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./authPages/loginPage";
import Signin from "./authPages/signinPage";
import Home from "./sourcePages/homePage";
import StockPage from "./sourcePages/stockPage";
import StockAnalysisPage from "./sourcePages/stockAnalysisPage";
import { useState } from "react";
import RefrshHandler from "./refrshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/stockPage/:stockName" element={<StockPage />} />
        <Route path="/stockAnalysisPage/" element={<StockAnalysisPage />} />
      </Routes>
    </div>
  );
}
export default App;
