import './App.css';
import "./components/navbar.css"

import Navbar from "./components/Navbar"
import Home from "./components/Home"

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function App() {

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories);
  const fetchData = () => {
    const lowercaseCategories = categories.toLowerCase();
    fetch(
      categories ?
      `https://api.currentsapi.services/v1/latest-news?apiKey=eJ47OiYS3zC815vMB9z19Di6uJ_EaL119FoMrS0geMROMtIR&category=${lowercaseCategories}`
      :
      "https://api.currentsapi.services/v1/latest-news?apiKey=eJ47OiYS3zC815vMB9z19Di6uJ_EaL119FoMrS0geMROMtIR"
       
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.news);
        console.log(categories);
        dispatch({ type: "SET_ARTICLE", payload: res.news })
      })
  }
  useEffect(() => {
    fetchData()
  }, [categories])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [{
        path: "/",
        element: <Home />
      },{
        path: "/business",
        element: <Home />
      }, {
        path: "/entertainment",
        element: <Home />
      }, {
        path: "/health",
        element: <Home />
      }, {
        path: "/science",
        element: <Home />
      }, {
        path: "/sports",
        element: <Home />
      }, {
        path: "/technology",
        element: <Home />
      }

      ]
    }
  ])

  return (

    <RouterProvider router={router}></RouterProvider>

  );
}

export default App;
