import React from 'react';
import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import AuthContext from "./service/auth/AuthContextProvider";
import { useContext } from "react";
// import Resource from "./components/resource/Resource";
import Auth from "./components/authentication/Auth";
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/Products';
import CreateProduct from './components/products/CreateProduct';
import Users from './components/users/Users';
import UpdateProduct from './components/products/UpdateProduct';


function App() {


  const { authState } = useContext(AuthContext);

  const [inverted, setInverted] = useState(false);

  const handleInvertColors = () => {
    setInverted(!inverted);
    document.body.classList.toggle('inverted');
  };


  return (
      <main>
        <div className="top-0 w-full flex justify-end">
          <button
            onClick={handleInvertColors}
            className={`m-3 mb-0 px-4 py-4 rounded ${inverted ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'
              }`}
          >
            {inverted ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={authState.isLoggedIn ? "/dashboard" : "/user/login"}
              />
            }
          />
          {!authState.isLoggedIn && (
            <Route path="user">
              <Route path="register" element={<Auth />} />
              <Route path="login" element={<Auth />} />
            </Route>
          )}
          {authState.isLoggedIn && (
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="products" element={<Products />} />
              {authState.role == "ROLE_ADMIN" && (
                <>
                  <Route path="products/create" element={<CreateProduct />} />
                  <Route path="products/:id/edit" element={<UpdateProduct />} />
                  <Route path="users" element={<Users />
                  } />
                </>
              )}
            </Route>
          )}
        </Routes>
      </main>
  );
}

export default App;
