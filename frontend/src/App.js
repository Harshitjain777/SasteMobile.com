import Navbar from './Components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import SignUpForm from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import YourProducts from './Components/YourProducts';

function App() {
  return (
   <div>
   <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route element={<PrivateComponent></PrivateComponent>}>
      <Route path='/' element={<ProductList></ProductList>}></Route>
      <Route path='/yourproducts' element={<YourProducts></YourProducts>}></Route>
      <Route path='/addproduct' element={<AddProduct></AddProduct>}></Route>
      <Route path='/contact' element={<h1>Contact</h1>}></Route>
      <Route path='/profile' element={<h1>Profile</h1>}></Route>
      </Route>
      <Route path='/signup' element={<SignUpForm></SignUpForm>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Routes>
    <Footer></Footer>
   </BrowserRouter>
   </div>
  );
}

export default App;
