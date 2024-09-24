import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../../slices/cartSlice" 
import { toast } from "react-toastify"
import CheckOutSteps from "../../components/CheckOutSteps"

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart
    const [address,setAddress] = useState(shippingAddress?.address || "")
    const [city,setCity] = useState(shippingAddress?.city || "")
    const [postalCode,setPostalCode] = useState(shippingAddress?.postalCode || "")
    const [country,setCountry] = useState(shippingAddress?.country || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
   
}

    return (
        <div>
            <CheckOutSteps step1 step2/>
            <div className="container mx-auto">
                <form className="bg-white p-5 rounded-lg shadow-md" onSubmit={submitHandler}>
                    <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" placeholder="Enter your address" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" placeholder="Enter your city" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                        <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" placeholder="Enter your postal code" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                        <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" placeholder="Enter your country" required/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continue to Payment</button>
                        <button type="button" onClick={() => navigate("/cart")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Cart</button>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default Shipping;