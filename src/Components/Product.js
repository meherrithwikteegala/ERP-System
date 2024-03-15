import React, { useState } from 'react';
import './Product.css';


let initialProducts = [
  { id: 1, name: 'Boat astra', category: 'Smart Watch', price: 2000, stockQuantity: 20 },
  { id: 2, name: 'Fit bit', category: 'Smart Watch', price: 5000, stockQuantity: 15 },
  { id: 3, name: 'Realme buds 2', category: 'TWS', price: 1800, stockQuantity: 10 },
  { id: 4, name: 'Nothing Ear Stick', category: 'TWS', price: 4000, stockQuantity: 20 },
  { id: 5, name: 'Boat airdops141', category: 'TWS', price: 900, stockQuantity: 15 },
  { id: 6, name: 'Nothing phone 2A', category: 'Smart Phone', price: 23000, stockQuantity: 10 },
  { id: 7, name: 'MI 14 ultra', category: 'Smart Phone', price: 90000, stockQuantity: 20 },
  { id: 8, name: 'Iqoo Neo 9 pro', category: 'Smart Phone', price: 26900, stockQuantity: 15 },
  { id: 9, name: 'Moto edge 50 ultra', category: 'Smart phone', price: 57000, stockQuantity: 10 },
  { id: 10, name: 'vivo v30 pro', category: 'Smart phone', price: 40000, stockQuantity: 20 },
  { id: 11, name: 'Real me 12+', category: 'Smart phone', price: 17000, stockQuantity: 15 },
  { id: 12, name: 'Poco X6 Neo', category: 'Smart phone', price: 16000, stockQuantity: 20 },
];

function Product() {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stockQuantity: '' });
  const [showInputFields, setShowInputFields] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleAddProduct = () => {
    // Ensure all fields are filled before adding the product
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stockQuantity) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedProducts);
    setNewProduct({ name: '', category: '', price: '', stockQuantity: '' });
    setShowInputFields(false); // Hide input fields after adding a product
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setNewProduct({ ...product });
    setShowInputFields(true); // Show input fields when editing a product
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProductId ? { ...newProduct } : product
    );
    setProducts(updatedProducts);
    setNewProduct({ name: '', category: '', price: '', stockQuantity: '' });
    setEditProductId(null);
    setShowInputFields(false); // Hide input fields after updating a product
  };

  return (
    <div className="container">
      <h2 className="product-heading">Product List</h2>
     
      <div className="add-product">
        <h2 className="add-product-heading">Add New Product</h2>
        {showInputFields && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Stock Quantity"
              value={newProduct.stockQuantity}
              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
              className="input-field"
            />
          </>
        )}
        <button onClick={() => setShowInputFields(true)} className="add-button">Add Product</button>
        {showInputFields && <button onClick={handleAddProduct} className="add-button-save">Save</button>}
      </div>


      <div className="product-table">
        <div className="product-header">
          <div className="product-cell">Product Name</div>
          <div className="product-cell">Category</div>
          <div className="product-cell">Price</div>
          <div className="product-cell">Stock Quantity</div>
          <div className="product-cell">Actions</div>
        </div>
        {products.map(product => (
          <div key={product.id} className="product-row">
            <div className="product-cell">
              {editProductId === product.id ? (
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              ) : (
                product.name
              )}
            </div>
            <div className="product-cell">
              {editProductId === product.id ? (
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              ) : (
                product.category
              )}
            </div>
            <div className="product-cell">
              {editProductId === product.id ? (
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              ) : (
                product.price
              )}
            </div>
            <div className="product-cell">
              {editProductId === product.id ? (
                <input
                  type="text"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                />
              ) : (
                product.stockQuantity
              )}
            </div>
            <div className="product-cell">
              {editProductId === product.id ? (
                <button className="save" onClick={handleUpdateProduct}>Save</button>
              ) : (
                <button  className='product-button' onClick={() => handleEditProduct(product)}>Edit</button>
              )}
              <button className='delete-button' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
