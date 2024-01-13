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
  const searchValue = useSelector((state) => state.search);
  const searchBtnClicked = useSelector((state) => state.searchBtnClicked);
  const fetchData = () => {
    const lowercaseCategories = categories.toLowerCase();
    const url = searchValue.length>3 && searchBtnClicked
    ? `https://api.currentsapi.services/v1/search?keywords=${searchValue}&language=en&apiKey=EajOCh23TaFYeMi_1lkSNSolgquoCw4HOzzm7Mq36eDSJ06b`
    : categories
      ? `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=EajOCh23TaFYeMi_1lkSNSolgquoCw4HOzzm7Mq36eDSJ06b&category=${lowercaseCategories}`
      : 'https://api.currentsapi.services/v1/latest-news?language=en&apiKey=EajOCh23TaFYeMi_1lkSNSolgquoCw4HOzzm7Mq36eDSJ06b';
    fetch(url)
      .then((res) => res.json())
    .then((res) => {
      console.log(res.news);
      console.log(categories);
      dispatch({ type: "SET_ARTICLE", payload: res.news })
    })
}
useEffect(() => {
  fetchData()
}, [categories,searchBtnClicked])


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [{
      path: "/",
      element: <Home cat="" />
    }, {
      path: "/business",
      element: <Home cat="Business" />
    }, {
      path: "/entertainment",
      element: <Home cat="Entertainment" />
    }, {
      path: "/health",
      element: <Home cat="Health" />
    }, {
      path: "/science",
      element: <Home cat="Science" />
    }, {
      path: "/sports",
      element: <Home cat="Sports" />
    }, {
      path: "/technology",
      element: <Home cat="Technology" />
    }

    ]
  }
])

return (

  <RouterProvider router={router}></RouterProvider>

);
}

export default App;
