import React from "react";
import './post.css';
import { Link } from "react-router-dom";

function Post({post}) {
    const PF = "http://localhost:4000/images/"
    console.log(PF);
  return (
    <div className="post">

        {post.photo && 
        (
        <img src={PF + post.photo} alt="postImage"/>
        )}
        <div className="postInfo">
            <div className="postCats">

                {post.categories.map(c =>
                (
                    <span className="postCat"> 
                        <Link className="link" to="/posts?cat=Music">
                            {c.name}
                        </Link>
                    </span>
                ))}
            </div>
            <span className="postTitle">  
                <Link to= {`/post/${post._id}`} className="link">
                   {post.title}
                </Link>
          </span>
          <hr></hr>
          <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className = "postDesc">{post.desc}</p>
    </div>
)};

export default Post;
