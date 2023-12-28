import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserHome from "./Components/User/Home/Home";
import MerchantHome from "./Components/Merchant/Home/Home";
import UserSignup from "./Components/UserEntry/SignUp";
import UserLogIn from "./Components/UserEntry/Login";
import SingleProduct from "./Components/Common/SingleProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Common Routes */}
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/singleproduct/:productId" element={<SingleProduct/>} />
        {/* User Routes */}
        <Route path="/" element={<UserHome />} />
        {/* Merchant Routes */}
        <Route path="/merchant" element={<MerchantHome/>}/>
      </Routes>
    </div>
  );
}

export default App;
