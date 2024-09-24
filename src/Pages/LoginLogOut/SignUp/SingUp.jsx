import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { useRegisterMutation } from '../../../slices/userApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';

const SingUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [register,{isLoading}]=useRegisterMutation();
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
        if(password !== confirmPassword){
          toast.error("Password and Confirm Password do not match")
          return;
        }else{

        try{
          const res = await register({ name, email, password, confirmPassword }).unwrap();
          dispatch(setCredentials({...res,userInfo})) 
          navigate(redirect);
        }catch(err){
          toast.error(err?.data?.message||err?.error)
        }
      }
    }
    return (
        <div>
        {isLoading && <Loader/>}
        <div className="hero bg-white min-h-screen my-10">
    <div className="hero-content flex-col lg:flex-row">
      
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={submitHandler}>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            
            <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
          </div>

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
           
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirmPassword" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">Sign Up</button>
          </div>
          <div>
              <p>
                  Already have an account? <Link to='/login'>Login</Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  </div>
      </div>
    )
}

export default SingUp;
