import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import axios from 'axios'
const Products = () => {
  const [products,setProducts]=useState([])

 useEffect(() => {
   // Fetch data using Axios
   axios.get("http://localhost:5000/api/products")
     .then((res) => {
       // Update the products state with the fetched data
       setProducts(res.data);
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
 }, []);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-4">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    );
};

export default Products;