import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Article from "./components/Article";
import SetAvaatar from "./components/SetAvatar";

function App() {

  return<> <BrowserRouter>
  
    <Routes> 

        <Route path="/" element={<Article/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/setAvatar" element={<SetAvaatar/>}></Route>
        <Route path="/authentication" element={<ForgotPassword/>}></Route>
    </Routes>
  </BrowserRouter>
  </>
} 

export default App;
