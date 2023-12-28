import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const context = createContext();
export const useCommonContext = () => useContext(context);

const ContextApi = ({ children }) => {
  // State for chacking user loged in or not
  const [userLogedIn, setUserLogedIn] = useState(false);
  // State and function for filter model
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  // Products
  const [Products, setProducts] = useState({});
  // Loadng functionalities for load while fetching
  const [productLoading, setProductLoading] = useState(true);
  // checking if products are filtered or not which are in products
  const [filtered, setFiltered] = useState(false);
  // Checking the user merchant or not
  const [merchant, setMerchant] = useState(false);

  // State and function for adding new product modal
  const [openProductModal, setOpenProductModal] = useState(false);
  const handleOpenProductModal = () => setOpenProductModal(true);
  const handleCloseProductModal = () => setOpenProductModal(false);

  const getProducts = async () => {
    try {
      setProductLoading(true);
      const response = await axios.get(
        "https://qurinom-2-backend.onrender.com/api/products"
      );
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const value = {
    userLogedIn,
    setUserLogedIn,
    openFilter,
    setOpenFilter,
    handleOpenFilter,
    handleCloseFilter,
    Products,
    setProducts,
    getProducts,
    setProductLoading,
    productLoading,
    filtered,
    setFiltered,
    merchant,
    setMerchant,
    openProductModal,
    setOpenProductModal,
    handleOpenProductModal,
    handleCloseProductModal,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextApi;
