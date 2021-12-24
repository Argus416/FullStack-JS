import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "../components/Loading";
import Comment from "../components/Comment";
import { AuthContext } from "../helpers/AuthContext";
const Post = () => {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    console.log(authState);
    const initialValues = {
        PostId: id,
        comment: "",
        username: authState.username,
    };
    const [postObject, setPostObject] = useState("");
    const [comments, setComments] = useState("");
    const [newComment] = useState(initialValues);

    useEffect(() => {
        // * Get post
        axios.get(`http://localhost:3001/post/${id}`).then((response) => {
            setPostObject(response.data);
        });

        // * Get comments
        axios.get(`http://localhost:3001/comments/post/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required("You can't post en empty comment"),
    });

    const onSubmitHandler = (data, { resetForm }) => {
        // * Create new comment
        axios
            .post(`http://localhost:3001/comments/create`, data, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data.error) {
                    const err = response.data.error.message;
                    return alert("User not authenticated, Error code :" + err);
                } else {
                    setComments((prevComment) => {
                        resetForm();
                        return [response.data, ...prevComment];
                    });
                }
            });
    };

    return (
        <main className="container">
            {postObject ? (
                <div className="content">
                    <h1 className="h3 m">{postObject.title}</h1>
                    <p>{postObject.body}</p>

                    <section id="comments">
                        <h2>Comments</h2>
                        {comments ? (
                            comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    comment={comment.comment}
                                    userName={comment.username}
                                />
                            ))
                        ) : (
                            <span>Add the first comment ! </span>
                        )}

                        <div className="add-comment">
                            <img src="https://via.placeholder.com/150" alt="img place holder" />
                            <div className="right">
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={onSubmitHandler}
                                    validationSchema={validationSchema}
                                >
                                    <Form className="form-add-comment">
                                        <div className="input-field ">
                                            <span className="username"> {newComment.username}</span>
                                            <Field
                                                autoComplete="off"
                                                name="comment"
                                                id="comment"
                                                placeholder="Your comment..."
                                            />
                                            <ErrorMessage name="comment" className="red-text" component="span" />
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <Loading />
            )}
        </main>
    );
};

export default Post;
