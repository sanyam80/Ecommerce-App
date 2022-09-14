import React, { useReducer } from "react";
// import { useContext } from "react";
import { createContext } from "react";

 const stateContext = createContext();
const  UPDATE_SELECTED_CATEGORY = " UPDATE_SELECTED_CATEGORY";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const ADD_CATEGORIES = "ADD_CATEGORIES";
const Action = {
  UPDATE_SELECTED_CATEGORY,
  ADD_PRODUCTS,
  ADD_CATEGORIES
}
 const initialState = {
   
    products :[],
    categories:[]
}

function reducer(state,action){
    const{type,payload} = action;
    switch(type){
        case Action.UPDATE_SELECTED_CATEGORY:
            return{...state,selectedCategory:payload}
        case Action.ADD_PRODUCTS:
            return{...state,products:payload}
        case Action.ADD_CATEGORIES:
            return{...state,categories:payload}
   default:
    return state;
}
}

const StateContextProvider = ({children})=>{
    const reducerContext = useReducer(reducer,initialState);
    // reducerCOntext = [state,dispatch]
    return <stateContext.Provider value = {reducerContext}>{children}</stateContext.Provider>
}
// custom hooks
// const useSelector = (fn) => fn(React.useContext(stateContext)[0]);
// const useDispatch = () => React.useContext(stateContext)[1]

export {StateContextProvider, Action,stateContext}