import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CarFeaturesPage from './components/car';
import Demo from './components/Demo';
import Main from './components/main';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "virtus",
    element: <CarFeaturesPage />,
  },
  {
    path: "demo",
    element: <Demo/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <App />
    <RouterProvider router={router} />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
