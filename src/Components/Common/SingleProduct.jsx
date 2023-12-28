import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import styles from "./common.module.css";
import { decodeToken } from "react-jwt";
import { useCommonContext } from "../StateManagement/ContextApi";
import EditProducts from "../Merchant/Product/EditProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "rgb(211, 210, 210)",
  borderRadius: "7px",
  p: 3,
};

const SingleProduct = () => {
  const { setMerchant, merchant } = useCommonContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  // Modal states and funtions for edit functionalities
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const handleOpenEditProductModal = () => setOpenEditProductModal(true);
  const handleCloseEditProductModal = () => setOpenEditProductModal(false);
   // Modal states and funtions for delete functionalities
  const [openDeletModal, setOpenDeletModal] = useState(false);
  const handleOpenDeletModal = () => setOpenDeletModal(true);
  const handleCloseDeletModal = () => setOpenDeletModal(false);

  const navigate = useNavigate();

  // Getting single product
  const getSingleProduct = async () => {
    try {
      setProductLoading(true);
      const response = await axios.get(
        `https://qurinom-2-backend.onrender.com/api/products?productId=${productId}`
      );
      const data = response.data[0];
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    } finally {
      setProductLoading(false);
    }
  };

  // Check if user is merchant or not if merchant user can do somefecility
  const checkMerchantToken = () => {
    const userToken = localStorage.getItem("authorization");

    if (!userToken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const user = decodeToken(userToken);

        if (user.userType === "merchant") {
          setMerchant(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login", { replace: true });
      }
    }
  };

  // Product delete function
  const handleDelete = async () => {
    try {
      setProductLoading(true);
      await axios.delete(
        `https://qurinom-2-backend.onrender.com/api/products/${productId}`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
      handleCloseDeletModal();
      setProductLoading(false);
      navigate("/merchant");
    } catch (error) {
      console.log(error);
      setProductLoading(false);
      handleCloseDeletModal();
    }
  };
  useEffect(() => {
    getSingleProduct();
    checkMerchantToken();
  }, []);

  console.log(merchant);
  return (
    <div>
      {productLoading ? (
        <div className={styles.CircularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <Card className={styles.Card}>
          {/* Products details */}
          <CardMedia
            component="img"
            className={styles.CardMedia}
            image={product?.imageUrl}
            alt={product?.name}
          />
          <CardContent className={styles.productDetails}>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Price: {product?.price}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Location: {product?.location}
            </Typography>

            {/* If user is merchant can edit or delete otherwise user can buy */}
            {merchant ? (
              <Typography component="div" sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleOpenEditProductModal}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenDeletModal}
                  fullWidth
                >
                  Delete
                </Button>
              </Typography>
            ) : (
              <Button variant="contained" sx={{ backgroundColor: "black" }}>
                Buy now
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {merchant && (
        <div>
          {/* Edit product modal */}
          <Modal
            open={openEditProductModal}
            onClose={handleCloseEditProductModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <EditProducts
              product={product}
              setProduct={setProduct}
              id={productId}
              handleCloseEditProductModal={handleCloseEditProductModal}
              getSingleProduct={getSingleProduct}
            />
          </Modal>
          {/* deleting product modal */}
          <Modal
            open={openDeletModal}
            onClose={handleCloseDeletModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="div" sx={style}>
              <Typography
                variant="h6"
                textAlign="center"
                color="error"
                fontWeight="bold"
              >
                Confirm Delete
              </Typography>
              <Typography variant="body1" textAlign="center">
                Are you sure you want to delete this product?
              </Typography>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCloseDeletModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  color="error"
                  fullWidth
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
