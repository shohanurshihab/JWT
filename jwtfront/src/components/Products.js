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
          {/* Detailed Information */}
          {selectedProduct && (
            <div>
              <p>Category: {selectedProduct.CategoryName}</p>
              <p>Unit: {selectedProduct.UnitName}</p>
              <p>Code: {selectedProduct.Code}</p>
              <p>Product Barcode: {selectedProduct.ProductBarcode}</p>
              <p>Description: {selectedProduct.Description}</p>
              <p>Brand: {selectedProduct.BrandName}</p>
              <p>Size: {selectedProduct.SizeName}</p>
              <p>Color: {selectedProduct.ColorName}</p>
              <p>Model: {selectedProduct.ModelName}</p>
              <p>Variant: {selectedProduct.VariantName}</p>
              <p>Old Price: ${selectedProduct.OldPrice}</p>
              <p>Cost Price: ${selectedProduct.CostPrice}</p>
              <p>Stock: {selectedProduct.stock}</p>
              <p>Total Purchase: {selectedProduct.TotalPurchase}</p>
              <p>Last Purchase Date: {selectedProduct.LastPurchaseDate}</p>
              <p>Last Purchase Supplier: {selectedProduct.LastPurchaseSupplier}</p>
              <p>Total Sales: {selectedProduct.TotalSales}</p>
              <p>Last Sales Date: {selectedProduct.LastSalesDate}</p>
              <p>Last Sales Customer: {selectedProduct.LastSalesCustomer}</p>
              <p>Type: {selectedProduct.Type}</p>
              <p>Status: {selectedProduct.Status}</p>
              <p>Commission Amount: ${selectedProduct.CommissionAmount}</p>
              <p>Commission Percentage: {selectedProduct.CommissionPer}%</p>
              <p>PCTN: {selectedProduct.PCTN}</p>
            </div>
          )}
          {/* End of Detailed Information */}
        </Modal.Body>
        <Modal.Footer>
            <br></br>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div></>
  );
};

export default Product;
