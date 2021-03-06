import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="page-footer blue darken-4">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Footer Content</h5>
                        <p className="grey-text text-lighten-4">
                            You can use rows and columns here to organize your footer content.
                        </p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li>
                                <Link className="grey-text text-lighten-3" to="/create/post">
                                    Home page
                                </Link>
                            </li>
                            <li>
                                <Link className="grey-text text-lighten-3" to="/create/post">
                                    New Post
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2021 Copyright MK-DEV
                    <a className="grey-text text-lighten-4 right" href="#!">
                        Other projects
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
