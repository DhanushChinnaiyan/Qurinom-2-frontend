import React, { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Base from "../../Base/Base";
import UserProduct from "../../User/Product/Product";
import { useCommonContext } from "../../StateManagement/ContextApi";
import { CircularProgress } from "@mui/material";
import homeImage from "../../../Home.png";
import styles from "./home.module.css";
import FilterProducts from "../../User/Product/FilterProducts";
import AddProducts from "../Product/AddProduct";

const MerchantHome = () => {
  const navigate = useNavigate();
  const {
    setUserLogedIn,
    setMerchant,
    Products,
    filtered,
    getProducts,
    productLoading,
  } = useCommonContext();
  //   Verify merchant role
  const checkMerchantToken = () => {
    const userToken = localStorage.getItem("authorization");

    if (!userToken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const user = decodeToken(userToken);

        if (user.userType !== "merchant") {
          localStorage.removeItem("authorization");
          navigate("/login", { replace: true });
        } else {
          setMerchant(true);
          setUserLogedIn(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    checkMerchantToken();
    getProducts();
  }, []);
  return (
    <>
      {productLoading ? (
        <div className={styles.CircularProgress}>
          <CircularProgress size="30px" />
        </div>
      ) : (
        <Base>
          <header className={styles.header}>
            <img src={homeImage} alt="Image" />
          </header>
          {!filtered && <FilterProducts />}
          <UserProduct />
          <AddProducts/>
        </Base>
      )}
    </>
  );
};

export default MerchantHome;
