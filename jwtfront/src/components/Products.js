import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, Card } from 'react-bootstrap';
import LeftNav from './LeftNav';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const items = [
    {
      href: "/dash",
      label: "Dashboard",
    },
    {
      href: "/profile",
      label: "Profile",
    },
    {
        href: "/logout",
        label: "Logout",
    },
  ];
  useEffect(() => {
    // Fetch product data from your API
    axios.get('https://www.pqstec.com/InvoiceApps/values/GetProductListAll')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderProductCards = () => {
    return products.map((product) => (
      <div
        key={product.Id}
        className="col-md-4 mb-3"
      >
        <Card>
          <Card.Body style={{ height: '200px' }}>
            <Card.Title>{product.Name}</Card.Title>
            <Card.Text>Price: ${product.Price}</Card.Text>
            {/* Add other minimal information you want to display */}
            <Button variant="primary" onClick={() => handleProductClick(product)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <><LeftNav items={items}/>
    <br></br>
    <div className="container product-page">
      <div className="row product-list">
        {renderProductCards()}
      </div>

      {/* Product Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{selectedProduct && selectedProduct.Name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProduct && (
      <div>
        <h4>Product Details</h4>
        <ul>
          <li>
            <strong>Category:</strong> {selectedProduct.CategoryName}
          </li>
          <li>
            <strong>Unit:</strong> {selectedProduct.UnitName}
          </li>
          <li>
            <strong>Code:</strong> {selectedProduct.Code}
          </li>
          <li>
            <strong>Product Barcode:</strong> {selectedProduct.ProductBarcode}
          </li>
          <li>
            <strong>Description:</strong> {selectedProduct.Description}
          </li>
          <li>
            <strong>Brand:</strong> {selectedProduct.BrandName}
          </li>
          <li>
            <strong>Size:</strong> {selectedProduct.SizeName}
          </li>
          <li>
            <strong>Color:</strong> {selectedProduct.ColorName}
          </li>
          <li>
            <strong>Model:</strong> {selectedProduct.ModelName}
          </li>
          <li>
            <strong>Variant:</strong> {selectedProduct.VariantName}
          </li>
          <li>
            <strong>Type:</strong> {selectedProduct.Type}
          </li>
          <li>
            <strong>Status:</strong> {selectedProduct.Status}
          </li>
        </ul>

        <h4>Pricing and Stock</h4>
        <ul>
          <li>
            <strong>Old Price:</strong> ${selectedProduct.OldPrice}
          </li>
          <li>
            <strong>Cost Price:</strong> ${selectedProduct.CostPrice}
          </li>
          <li>
            <strong>Stock:</strong> {selectedProduct.stock}
          </li>
        </ul>

        <h4>Purchase Information</h4>
        <ul>
          <li>
            <strong>Total Purchase:</strong> {selectedProduct.TotalPurchase}
          </li>
          <li>
            <strong>Last Purchase Date:</strong> {selectedProduct.LastPurchaseDate}
          </li>
          <li>
            <strong>Last Purchase Supplier:</strong> {selectedProduct.LastPurchaseSupplier}
          </li>
        </ul>

        <h4>Sales Information</h4>
        <ul>
          <li>
            <strong>Total Sales:</strong> {selectedProduct.TotalSales}
          </li>
          <li>
            <strong>Last Sales Date:</strong> {selectedProduct.LastSalesDate}
          </li>
          <li>
            <strong>Last Sales Customer:</strong> {selectedProduct.LastSalesCustomer}
          </li>
        </ul>

        <h4>Commission</h4>
        <ul>
          <li>
            <strong>Commission Amount:</strong> ${selectedProduct.CommissionAmount}
          </li>
          <li>
            <strong>Commission Percentage:</strong> {selectedProduct.CommissionPer}%
          </li>
        </ul>

        <h4>PCTN</h4>
        <p>{selectedProduct.PCTN}</p>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div></>
  );
};

export default Product;
