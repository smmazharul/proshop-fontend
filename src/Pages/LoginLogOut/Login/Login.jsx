
import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../slices/userApiSlice';
const Login = () => {
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  

  const disPatch = useDispatch()
  const navigate = useNavigate()
  
  const [login,{isLoading}]=useLoginMutation()
  
    const submitHandler = async (e) => {
        e.preventDefault();
      console.log("sumbit")
    }
  return (
    <div>
      <div className="hero bg-white min-h-screen my-10">
  <div className="hero-content flex-col lg:flex-row">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={submitHandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Login</button>
        </div>
        <div>
            <p>
                Don't have an account? <Link to='/signup'>Signup</Link>
            </p>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;