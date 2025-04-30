import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./authPages/loginPage";
import Signin from "./authPages/signinPage";
import ForgotPassword from "./authPages/forgotPassword";
import Home from "./sourcePages/homePage";
import StockPage from "./sourcePages/stockPage";
import StockAnalysisPage from "./sourcePages/stockAnalysisPage";
import ProfilePage from "./sourcePages/profilePage";
import Archives from "./userProfileComponent/archives";
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
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/stockPage/:stockName" element={<StockPage />} />
        <Route path="/stockAnalysisPage" element={<StockAnalysisPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/Archive" element={<Archives />} />
      </Routes>
    </div>
  );
}
export default App;
