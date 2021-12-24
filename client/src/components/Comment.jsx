import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

const Comment = ({ id, comment, userName }) => {
    const { authState } = useContext(AuthContext);
    console.log(authState);

    return (
        <div className="comments-container" data-id={id}>
            <div className="comment">
                <img src="https://via.placeholder.com/150" alt="img place holder" />
                <div className="right">
                    <div className="comment-header-container">
                        <span className="username">{userName}</span>
                        <button className="delete-btn">
                            <i className="material-icons right">delete</i>
                        </button>
                    </div>
                    <p className="comment-content">{comment}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
