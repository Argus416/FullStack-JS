const Comment = ({ id, comment, userName }) => {
    return (
        <div className="comments-container" data-id={id}>
            <div className="comment">
                <img src="https://via.placeholder.com/150" alt="img place holder" />
                <div className="right">
                    <span className="username">{userName}</span>
                    <p className="comment-content">{comment}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
