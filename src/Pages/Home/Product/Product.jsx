import React from 'react';

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from 'react-router-dom';
const Product = ({ product }) => {
    
    return (
      <div className="card card-compact bg-base-100  shadow-xl">
        <figure>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt="Shoes" />
          </Link>
        </figure>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="card-title underline">
              {product.name.substring(0, 20)}....
            </h2>
          </Link>
          <p>{product.description.substring(0, 50)}.....</p>
          <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
          <p className="text-xl font-bold">${product.price}</p>
          {/* <div className="card-actions justify-center">
            <button className="btn btn-outline border-0 border-b-4">
              Buy Now
            </button>
          </div> */}
        </div>
      </div>
    );
};

export default Product;