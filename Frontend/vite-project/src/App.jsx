import { useState } from "react";
import Navbar from "./Components/Navbar";
import MovieDisplay from "./Components/MovieDisplay";
import { Login } from "./Components/Login";
import Welcome from "./Components/Welcome";
import { AddForm } from "./Components/AddForm";
import{BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<MovieDisplay />}></Route>
        <Route path="/welcome" element={<Welcome/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/add/:page" element={<AddForm/>}></Route>
       </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
