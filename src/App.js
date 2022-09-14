import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path = "/" element = {<Home></Home>}></Route>
        <Route path = "/cart" element = {<Cart></Cart>}></Route>
      </Routes>
   
    </div>
  );
}

export default App;
