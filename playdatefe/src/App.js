import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Footer from './components/Footer';
import PlaydatesTabs from "./components/PlaydatesTabs";
import { useState, createContext } from "react";

export const UserContext = createContext(null);

function App() {
  const [authenticationToken, setAuthenticationToken] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={{authenticationToken, setAuthenticationToken}} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {authenticationToken ? <Route path="/playtabs" element={<PlaydatesTabs/>} /> : 
            <Route path="/" element={<Home /> } />}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
