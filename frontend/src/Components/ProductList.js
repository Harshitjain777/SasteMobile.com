import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  console.log(products);

  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>Products</h1>
    <div style={styles.productList}>
     
      {products.length>0?
         

        
        products.map(product => (
        <div key={product._id} style={styles.product}>
          <img src={require(`../images/${product.image}`)} alt={product.name} style={styles.image} />
          <div style={styles.details}>
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>Price: {product.price}Rs/-</p>
            <p style={styles.contact}>Contact: {product.contact}</p>
            <button>Chat with Seller</button>
          </div>
        </div>
    

      ))
      :
      <p>No products</p>
      
      }
    </div>
  </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    marginBottom:'50px'
  },
  heading: {
    textAlign: 'center',
    fontSize: '42px',
    marginBottom: '20px',
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#f9f9f9',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '20px',
  },
  product: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  details: {
    textAlign: 'center',
  },
  productName: {
    fontSize: '24px',
    marginBottom: '5px',
  },
  description: {
    marginBottom: '5px',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  contact: {
    fontStyle: 'italic',
    color: '#666',
  },
};

export default ProductList;
