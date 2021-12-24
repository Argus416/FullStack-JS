import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
const Navbar = () => {
    const { authState, setAuthState } = useContext(AuthContext);

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ isLoggedin: false });
    };
    return (
        <nav>
            <div className="nav-wrapper blue darken-4">
                <div className="container">
                    <Link className="brand-logo" to="/">
                        FullStack JS
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        {!authState.isLoggedin ? (
                            <>
                                <li>
                                    <Link to="/Signup">Sign up</Link>
                                </li>

                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/create/post">New post</Link>
                                </li>
                                <li>
                                    <button className="logout-btn" onClick={logoutHandler}>
                                        Logout
                                    </button>
                                </li>
                                <li>
                                    <span className="username-profile">{authState.username}</span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
