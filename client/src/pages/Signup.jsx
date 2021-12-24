import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("You must write your username"),
        password: Yup.string().required("You must write your password"),
    });

    const onSubmitHandler = (data) => {
        axios
            .post("http://localhost:3001/user/create", data)
            .then((response) => alert("User created"))
            .catch((err) => alert(`Error created user, error code : ${err}`));
    };

    return (
        <div className="container signup-container">
            <h1>Signup</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
                <Form>
                    <div>
                        <Field id="username" className="username validate" name="username" placeholder="Username" />
                        <ErrorMessage className="red-text username" name="username" component="span" />
                    </div>
                    <div>
                        <Field
                            id="password"
                            type="password"
                            className="password validate"
                            name="password"
                            placeholder="password"
                        />
                        <ErrorMessage className="red-text password" name="password" component="span" />
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

export default Signup;
