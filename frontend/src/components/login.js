import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/login', data);
      navigate('/home');
      console.log(response);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-3">
        <main className="form-signin w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control mb-3" placeholder="Enter email address" {...register('email', { required: 'Email is required' })} />
            {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
          </div>
          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control mb-3" placeholder="Enter password" {...register('password', { required: 'Password is required' })} />
            {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
          </div>
          <button className="btn btn-light btn-lg" type="button" onClick={() => window.location.href = '/register'}>
            Register
          </button>
          <button className="btn btn-primary btn-lg" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </main>
      </form>
    </div>
  );
}

export default Login;
