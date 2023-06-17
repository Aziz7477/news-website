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
    fetch(
      categories
        ? `https://newsapi.org/v2/top-headlines?country=in&category=${categories}&apiKey=c32d03c930f14bce9c755599108f1306`
        : "https://newsapi.org/v2/top-headlines?country=in&apiKey=c32d03c930f14bce9c755599108f1306"
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "SET_ARTICLE", payload: res.articles })
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
