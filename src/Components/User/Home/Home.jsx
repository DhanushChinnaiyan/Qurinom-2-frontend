import React, { useEffect } from "react";
import homeImage from "../../../Home.png";
import Base from "../../Base/Base";
import { useCommonContext } from "../../StateManagement/ContextApi";
import { decodeToken } from "react-jwt";
import FilterProducts from "../Product/FilterProducts";
import { CircularProgress } from "@mui/material";
import styles from "./home.module.css";
import UserProduct from "../Product/Product";

const UserHome = () => {
  const { setUserLogedIn, Products, filtered, getProducts, productLoading } =
    useCommonContext();

  const checkUserToken = () => {
    const userToken = localStorage.getItem("authorization");

    if (userToken) {
      try {
        const user = decodeToken(userToken);

        if (user.userType === "user") {
          setUserLogedIn(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    checkUserToken();
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
        </Base>
      )}
    </>
  );
};

export default UserHome;
