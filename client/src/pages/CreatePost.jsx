import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import M from "materialize-css";

const CreatePost = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        body: Yup.string().required(),
        userName: Yup.string().min(3).max(15).required(),
    });

    const initialValues = {
        title: "",
        body: "",
        userName: "Mohamad",
    };

    const onSubmitHandler = (data) => {
        axios
            .post("http://localhost:3001/post/create", data, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.error) {
                    const err = response.data.error.message;
                    console.log(err);
                    alert(err);
                } else {
                    M.toast({ html: "Post added", displayLength: 800 });
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            });
    };
    return (
        <div className="container" id="create-post">
            <h1>Add new post</h1>

            <div className="row">
                <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
                    <Form>
                        <div className="input-field">
                            <div className="row">
                                <label htmlFor="title">Title</label>
                                <Field autoComplete="off" id="title" name="title" className="validate" />
                                <ErrorMessage name="title" className="red-text" component="span" />
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="row">
                                <label htmlFor="body">Body</label>
                                <Field autoComplete="off" id="body" name="body" className="validate" />
                                <ErrorMessage name="body" className="red-text" component="span" />
                            </div>
                        </div>

                        <button className="btn waves-effect waves-light blue darken-4" type="submit" name="action">
                            Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CreatePost;
