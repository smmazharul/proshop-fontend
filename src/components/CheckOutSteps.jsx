import { Link } from "react-router-dom"


const CheckOutSteps = ({step1, step2, step3, step4}) => {
    return (
        <div role="tablist" className="tabs tabs-bordered">
            <Link to="/login" role="step1" className={`tab ${step1 ? 'tab-active' : ''}`}>
            { step1 ? <span className="text-blue-500">Sign In</span> : 'Sign In'}
            
            </Link>
            <Link to="/shipping" role="step2" className={`tab ${step2 ? 'tab-active' : ''}`}>
            { step2 ? <span className="text-blue-500"> Shipping</span> : 'Shipping'}
            </Link>
            <Link to="/payment" role="step3" className={`tab ${step3 ? 'tab-active' : ''}`}>
            { step3 ? <span className="text-blue-500">Payment</span> : 'Payment'}
            </Link>
            <Link to="/placeorder" role="step4" className={`tab ${step4 ? 'tab-active' : ''}`}>
            { step4 ? <span className="text-blue-500">Place Order</span> : 'Place Order'}
            </Link>
        </div>
    )
}

export default CheckOutSteps