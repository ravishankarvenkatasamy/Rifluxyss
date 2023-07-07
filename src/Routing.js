import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import Home from "./Home";



function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}> </Route>
        <Route path="/Home/:name" Component={Home}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing