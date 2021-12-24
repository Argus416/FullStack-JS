import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "materialize-css/dist/css/materialize.min.css";
import "./style/style.scss";

import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

const App = () => {
    const [authState, setAuthState] = useState({ isLoggedin: false, username: "", id: 0 });

    useEffect(() => {
        axios
            .get("http://localhost:3001/user/auth", {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, isLoggedin: false });
                } else {
                    setAuthState({ isLoggedin: true, username: response.data.username, id: response.data.id });
                }
            });
    }, []);

    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} exact />
                        <Route path="/create/post" element={<CreatePost />} exact />
                        <Route path="/show/post/:id" element={<Post />} exact />
                        <Route path="/login" element={<Login />} exact />
                        <Route path="/signup" element={<Signup />} exact />
                    </Routes>
                    <Footer />
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
