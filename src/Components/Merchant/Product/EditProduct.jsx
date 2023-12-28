import React, { useState } from "react";
import { useCommonContext } from "../../StateManagement/ContextApi";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./product.module.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "rgb(211, 210, 210)",
  borderRadius: "7px",
};

const EditProducts = ({
  id,
  handleCloseEditProductModal,
  product,
  getSingleProduct,
}) => {
  const [loading, setLoading] = useState(false);
  //   Initialy shows the products details
  const [formData, setFormData] = useState({
    name: product.name,
    imageUrl: product.imageUrl,
    description: product.description,
    price: product.price,
    category: product.category.name,
    subcategory: product.subcategory.name,
    location: product.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://qurinom-2-backend.onrender.com/api/products/${id}`,
        formData,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      getSingleProduct();
    } catch (error) {
      console.error("Error filtering products:", error.response);
    } finally {
      setLoading(false);
      handleCloseEditProductModal();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={style}
      className={styles.UserEntryBox}
    >
      <IconButton
        onClick={handleCloseEditProductModal}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CancelIcon color="error" />
      </IconButton>
      <TextField
        id="name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        id="imageUrl"
        label="Image URL"
        name="imageUrl"
        required
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <TextField
        id="price"
        label="Price"
        name="price"
        type="number"
        required
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        id="category"
        label="Category"
        name="category"
        required
        value={formData.category}
        onChange={handleChange}
      />
      <TextField
        id="subcategory"
        label="Sub Category"
        name="subcategory"
        required
        value={formData.subcategory}
        onChange={handleChange}
      />
      <TextField
        id="location"
        label="Location"
        name="location"
        required
        value={formData.location}
        onChange={handleChange}
      />
      <TextField
        multiline
        id="description"
        label="Description"
        name="description"
        required
        minRows={3}
        maxRows={3}
        value={formData.description}
        onChange={handleChange}
      />
      <Button
        disabled={loading}
        variant="contained"
        type="submit"
        sx={{ backgroundColor: "rgb(93, 23, 121)" }}
      >
        {loading ? <CircularProgress size="30px" color="secondary" /> : "Edit"}
      </Button>
    </Box>
  );
};

export default EditProducts;
