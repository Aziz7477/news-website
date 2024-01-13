import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    categories: "",
    articles: [],
    search: "",
    searchBtnClicked: false,
}

//reducer function

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return {
                ...state,
                categories: action.payload
            };
        case "SET_ARTICLE":
            return {
                ...state,
                articles: action.payload
            };
        case "SET_SEARCH":
            return {
                ...state,
                search: action.payload
            };
        case "SET_BTN_CLICK":
            return{
                ...state,
                searchBtnClicked:action.payload
            }
        default:
            return state;
    }
}
// Create the Redux store

const store = configureStore({
    reducer: reducer
});

export default store;

