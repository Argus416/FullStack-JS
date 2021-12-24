import { useNavigate, useParams } from "react-router-dom";

const PostItem = ({ id, title, body }) => {
    const navigate = useNavigate();
    return (
        <div className="col s12 m6">
            <div className="card blue darken-4">
                <div className="card-content white-text">
                    <span className="card-title">{title}</span>
                    <p>{body} </p>
                </div>
                <div className="card-action">
                    <div className="blue-text postitem-link" onClick={() => navigate(`/show/post/${id}`)}>
                        See post
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
