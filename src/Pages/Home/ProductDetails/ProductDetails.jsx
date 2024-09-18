import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
// import axios from "axios";
import { useGetProductByIdQuery } from "../../../slices/productApiSlice";
const ProductDetails = ({ id }) => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);
  console.log(product);

  // Handle loading state
  if (isLoading) {
    return <div>Loading product...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching product...</div>;
  }

  return (
    <div className="my-10 px-4">
      <div className="my-4">
        <Link to="/" className="btn btn-neutral">
          Back To Home
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center ">
        <div className="card lg:card-side bg-base-100 shadow-xl w-9/12 h-fit">
          <figure>
            <img src={product?.image} alt="Album" className="w-full h-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product?.name}</h2>
            <p>{product?.description}</p>
            <hr />
            <Rating
              style={{ maxWidth: 100 }}
              value={product?.rating}
              readOnly
            />
            <hr />
            <h2 className="card-title">${product?.price}</h2>
          </div>
        </div>
        {/* '''''''' */}

        <div className="card lg:card-side bg-base-100 shadow-xl w-3/12 h-[220px]">
          <div className="card-body">
            <h2 className="card-title">Price: {product?.price}</h2>
            <hr />
            <h3 className="card-title">
              Stock: {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </h3>
            <hr />
            <div className="card-actions justify-center">
              <button
                className="btn btn-neutral "
                disabled={product?.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
