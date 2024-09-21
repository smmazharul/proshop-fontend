
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { useLoginMutation } from '../../../slices/userApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [login,{isLoading}]=useLoginMutation();
    const {userInfo}=useSelector((state)=>state.auth);
    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect')||'/';

    useEffect(()=>{
      if(userInfo){
        navigate(redirect);
      }
    },[userInfo,navigate,redirect])
  
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
          const res=await login({email,password}).unwrap();
          dispatch(setCredentials({...res,userInfo}))
          navigate(redirect);
        }catch(err){
          toast.error(err?.data?.message||err?.error)
        }
      
    }
  return (
    <div>
      {isLoading && <Loader/>}
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