import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Notfound from "./Pages/Not Found/notfound";
import Deck from "./Pages/Deck/Deck";
import Profil from "./Pages/MyProfil/Profil";
import UserProfil from "./Pages/UsersProfil/UserProfil";
import Post from "./Pages/MakePost/Post";
import Topic from "./Pages/Topic/Topic";


function App() {
  const role = sessionStorage.getItem("role");


  return (
    <>
     <BrowserRouter>
     <>
        <div className="App">
          
              <Routes>
                <Route path="/" element={<Login />} />
                {(role === "admin" || role === "user") && (  
                  <>
                <Route path="/home" element={<Home />} />
                <Route path="/deck/:deckId" element={<Deck />} />
                <Route path="/myprofil" element={<Profil />} />
                <Route path="/profil/:Id" element={<UserProfil />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/topic" element={<Topic />} />
                </>
                )}
                <Route path="*" element={<Notfound />} />
              </Routes>
        </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
