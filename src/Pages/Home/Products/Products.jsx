// import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { useGetProductsQuery } from '../../../slices/productApiSlice';
import Product from '../Product/Product';



const Products = () => {

  const { data: products, isLoading, isError } = useGetProductsQuery();


    if (isLoading) {
      return <Loader></Loader>;
    }

    // Handle error state
    if (isError) {
      return <Message message={"Error fetching product..."}></Message>;
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