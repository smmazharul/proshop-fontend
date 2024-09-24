import CheckOutSteps from "../../components/CheckOutSteps"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { savePaymentMethod } from "../../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()
const cart = useSelector((state) => state.cart)
const {shippingAddress} = cart
const navigate = useNavigate()

    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3/>
            <div className="container mx-auto"> 
                <form onSubmit={submitHandler} className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                    <div className="mb-4">
                        <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">Select Payment Method</label>
                        <div className="flex items-center">
                            <input type="radio" name="paymentMethod" checked onChange={(e) => setPaymentMethod(e.target.value)} id="paypal" value="Paypal" className="radio radio-primary" defaultChecked />
                            <label htmlFor="paypal" className="label-text ml-2">Paypal Credit Card</label>
                        </div>
                       
                    </div>
                    <div className="flex justify-end">  
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continue </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment