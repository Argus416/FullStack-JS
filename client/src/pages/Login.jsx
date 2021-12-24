import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("You must write your username"),
        password: Yup.string().required("You must write your password"),
    });

    const { setAuthState } = useContext(AuthContext);

    const onSubmitHandler = (data) => {
        axios
            .post("http://localhost:3001/user/login", data)
            .then((response) => {
                if (response.data.error) {
                    const err = response.data.error;
                    alert(err);
                } else {
                    localStorage.setItem("accessToken", response.data);
                    console.log(response.data);
                    setAuthState({ isLoggedin: true, username: response.data.username });
                    navigate("/");
                }
            })
            .catch((err) => alert(`Error loggin in <br> Error code : ${err}`));
    };

    return (
        <div className="container login-container">
            <h1>Login</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
                <Form>
                    <div>
                        <Field
                            id="username"
                            className="username-login validate"
                            name="username"
                            placeholder="Username"
                        />
                        <ErrorMessage className="red-text" name="username" component="span" />
                    </div>
                    <div>
                        <Field
                            id="password"
                            className="password-login validate"
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        <ErrorMessage className="red-text" name="password" component="span" />
                    </div>
                    <button className="btn waves-effect waves-light blue darken-4" type="submit" name="action">
                        Submit
                        <i className="material-icons right">send</i>
                    </button>{" "}
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
