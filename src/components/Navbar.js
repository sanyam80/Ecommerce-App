import React, { useEffect,useState } from 'react'
import "./style.css";
import { Link } from 'react-router-dom';
import { useContext,useSelector} from 'react';
 import { Action, stateContext} from "../store.js"
 import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className = "header">
        <Link className = "ecomm" to = "/">Ecommerce App</Link>
        <Searchbar></Searchbar>
        <Link className = "cart" to = "/cart">Cart</Link>
    </div>
  )
}
function Searchbar(){
  const [selectedCategory,setselectedCategory] = useState();
  // // const dispatch = useDispatch();
  // const selectedCategory = useSelector(state => state.selectedCategory);
  const [state,dispatch] = useContext(stateContext);
  // const {selectedCategory} = state;
  const {categories} = state;
  const navigate = useNavigate();
  // const {selectedCategory} = useSelector(state => state.selectedCategory);
  


  // const [categories,setcategories] = useState([])
  // useEffect(()=>{
  //   fetchAllCategories();
  // },[])
  async function fetchAllCategories(){
  const result = await fetch('https://fakestoreapi.com/products/categories');
  // setcategories(await result.json());
  dispatch({type:Action.ADD_CATEGORIES,payload:await result.json()})
}
useEffect(()=>{
  if(categories.length===0){
    fetchAllCategories();
  }
},[])


const handleChange=(e)=>{
  const {value:category} = e.target;
  setselectedCategory(category)
  navigate(category==="All" ? "/" : `/?category=${e.target.value}`)
}
return (
  <div>
    <section>
    <select className = "input" onChange = {handleChange} value = {selectedCategory}>
    <option value = "all">All</option>
      {categories.map((category)=>{
        return <option key = {category} value = {category}>{category}</option>
      })}
    </select>
    </section>
    <section>
    {/* <select></select> */}
    </section>
  </div>
)
}

export default Navbar