import React, { useEffect } from 'react';
import "./style.css"
import { useContext } from 'react';
import { Action, stateContext} from "../store.js"
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    //  const selectedCategory = useSelector(state => state.selectedCategory);
    const[searchParams,] = useSearchParams();
    const [state,dispatch] = useContext(stateContext);
    // const{selectedCategory} = state;
   const selectedCategory = searchParams.get("category");
   const {products} = state;
   const filterProducts = selectedCategory?products.filter(prod=>prod.category===selectedCategory):products;
   console.log(filterProducts)
    const filterCategory = Array.from(new Set(filterProducts.map((prod)=>{
       return prod.category;
    })));
    
    console.log(filterCategory);
    // useEffect(()=>{
    //     selectedCategory==="all" ?fetchAllProducts():fetchProductByCategory(selectedCategory)
    // },[selectedCategory]);
    async function fetchAllProducts(){
      var res = await fetch('https://fakestoreapi.com/products')
      // setproducts(await res.json());
      dispatch({type:Action.ADD_PRODUCTS,payload:await res.json()})
       console.log(products)
    }

    if(products.length===0){
      fetchAllProducts();
    }
  
    // async function fetchProductByCategory(category){
    //    var res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    //    setproducts(await res.json());
    //    console.log(products)

    // }
 
  return (
    
    <div className = "fetch">

        {filterCategory.length? filterCategory.map((category)=>{
return <Category title = {category}>
{filterProducts.filter(prod=>prod.category===category).map(prod=><Product product = {prod}></Product>)}
</Category> }) :"No Products Found"}



</div>
)
}
      function Product({product}){
        
         const {image,price,title} = product
       return <div className = "design"><img src = {image} alt = ""></img>
      <div className = "title">{title}</div>
   
       <div>$ {price}</div>
    </div>
 
}
  function Category({title,children}){

    return (
        <div className = "category">
            <h2>{title}</h2>
            <div className= "category_row">{children}</div>
        </div>
    )
}



export default Home;