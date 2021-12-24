import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => setPosts(response.data));
    }, []);

    return (
        <div className="App">
            <div className="container">
                {posts &&
                    posts.map((post) => <PostItem key={post.id} id={post.id} title={post.title} body={post.body} />)}
            </div>
        </div>
    );
};

export default Home;
