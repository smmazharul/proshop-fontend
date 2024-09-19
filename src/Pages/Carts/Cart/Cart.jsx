import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addToCart,removeFromCart } from "../../../slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


    const handleQtyChange = async (product, qty) => {
        
       dispatch(addToCart({ ...product, qty })); // Assuming `updateCartQty` is the action to update cart quantity
    };
    
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }
    const checkOutHandler = () => {
      navigate('/login?redirect=/shipping')
    };
  return (
    <div className="my-10">
      <h1 className="text-2xl my-2">Carts Items</h1>

      <div className="flex justify-between">
        <div>
          {cartItems.length === 0 ? (
            <Link to="/">
              <Message message={`Your cart is empty,=> Go Shopping `} className="bg-green-400"></Message>
            </Link>
          ) : (
            cartItems.map((item, idx) => (
              <table className="table shadow-lg rounded-lg" key={idx}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <Link to={`/product/${item._id}`}>
                            <div className="font-bold underline">
                              {item.name}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link to={`/product/${item._id}`}>
                        <div className="text-sm">${item.price}</div>
                      </Link>
                    </td>
                    <td>
                      {item.countInStock > 0 && (
                        <form>
                          <div className="form-control">
                            {/* <label htmlFor={`qty-${item._id}`} className="mb-2">
                          Quantity
                        </label> */}
                            <select
                              id={`qty-${item._id}`}
                              value={item.qty}
                              onChange={(e) =>
                                handleQtyChange(item, Number(e.target.value))
                              }
                              className="select select-bordered"
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </form>
                      )}
                    </td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            ))
          )}
        </div>

        <div>
          <table className="table shadow-md">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <h2 className="text-2xl font-bold">
                    Subtotal
                    <span className="badge badge-secondary ">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                    Items
                  </h2>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xl font-bold">
                    Price: ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="btn btn-neutral"
                                      disabled={cartItems.length === 0}
                                      onClick={checkOutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
