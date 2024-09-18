// import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../../slices/productApiSlice';
import Product from '../Product/Product';
// import axios from 'axios'


const Products = () => {

  const { data: products, isLoading, isError } = useGetProductsQuery();
  console.log(products)

//   const [products,setProducts]=useState([])

//  useEffect(() => {
 
//    axios.get("http://localhost:5000/api/products")
//      .then((res) => {
    
//        setProducts(res.data);
//      })
//      .catch((error) => {
//        console.error("Error fetching data:", error);
//      });
  //  }, []);
  

    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Handle error state
    if (isError) {
      return <div>Error fetching products...</div>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-4">
        {products?.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    );
};

export default Products;