import React, {  useState } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Rating } from "@smastrom/react-rating";
// import axios from "axios";
import { useGetProductByIdQuery } from "../../../slices/productApiSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { addToCart } from "../../../slices/cartSlice";


const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  // Array for quantity options (based on the available stock)
  const qtyOptions = [...Array(product?.countInStock).keys()];
  console.log(qtyOptions)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    console.log(dispatch(addToCart({ ...product, qty })))
    navigate("/cart");
  };

  // Handle loading state
  if (isLoading) {
    return <Loader></Loader>;
  }

  // Handle error state
  if (isError) {
    return <Message message={"Error fetching product..."}></Message>;
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

        <div className="card lg:card-side bg-base-100 shadow-xl w-3/12 h-[260px]">
          <div className="card-body">
            <h2 className="card-title">Price: {product?.price}</h2>
            <hr />
            <h3 className="card-title">
              Stock: {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </h3>
            <hr />

            {product?.countInStock > 0 && (
              <form className="">
                <div className="form-control">
                  <label htmlFor="qty" className="mb-2">
                    Quantity
                  </label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))} // Update state on change
                    className="select select-bordered"
                  >
                    {qtyOptions.map((x) => (
                      <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            )}

            <div className="card-actions justify-center">
              <button
                className="btn btn-neutral "
                disabled={product?.countInStock === 0}
                onClick={addToCartHandler}
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
