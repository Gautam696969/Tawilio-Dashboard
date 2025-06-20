import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [loading, setLoading] = useState( false );
  const [showPassword, setShowPassword] = useState( false );
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword( !showPassword );
  };

  const handleLogin = async ( e ) => {
    e.preventDefault();
    setLoading( true );

    try {
      const response = await fetch( 'https://api.aivachat.io/api/web/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email, password } ),
      } );

      const data = await response.json();

      if ( response.ok ) {
        localStorage.setItem( 'token', data.token );
        localStorage.setItem( 'userId', data.userId );
        navigate( '/Dashboard' );
      } else {
        alert( data.message || 'Login failed!' );
      }
    } catch ( err ) {
      console.error( err );
      alert( 'Something went wrong' );
    } finally {
      setLoading( false );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-100 max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        {/* Email Field */}

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <div className="relative">

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={( e ) => setEmail( e.target.value )}
            required
            autoComplete="email"
          />
          <button
            type="button"
            className="absolute right-3 top-3">
            <FaUser className="text-gray-400" />
          </button>
        </div>

        {/* Password Field with Toggle */}
        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="w-full mb-6 px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={( e ) => setPassword( e.target.value )}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-3"
          >
            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

              {/* Sign up prompt */}
      <p className="mt-4 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <a href="#" className="text-indigo-600 font-semibold">
          Sign up
        </a>
      </p>
      </form>

    </div>
  );
};

export default Login;
