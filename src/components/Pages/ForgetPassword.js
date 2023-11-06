import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { forgetPassword } from "../../redux/auth";

function ForgetPasswordComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);
  
  
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please fill email.");
      return;
    }
    dispatch(forgetPassword(email));

  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-md-4">
            <div className="card">
            <div className="card-body">
                <h2 className="text-center mb-4">Forget Password</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && <p className="text-success text-center">{message}</p>}
                
                <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleInputChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Link to="/auth" >Back to Login</Link>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default ForgetPasswordComponent;