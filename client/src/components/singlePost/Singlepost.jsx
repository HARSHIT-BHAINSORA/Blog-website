import React, { useState } from "react";
import './singlepost.css';
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import { createSearchParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";


function Singlepost() {

    const location  = useLocation()
    const path = (location.pathname.split('/')[2]);
    const [post , setPost] = useState({});
    const PF = "http://localhost:4000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(()=>{
        const getPost = async()=>{

            const res = await axios.get("/posts/"+path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    } , [path]);

    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
            data:{username: user.username},
          });
          window.location.replace("/");
        } catch (err) {}
      };
    
    const handleUpdate = async() =>{
        try{
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
              });
              setUpdateMode(false);
        }catch(err)
        {
            console.log(err);
        }
    }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">

            {
                post.photo && 
                (<img className="singlePostImage" src={PF + post.photo} alt=""/>)
            }
           
            {updateMode ? ( <input   
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}/> 
            ):(
               <h1 className="singlePostTitle">{(title?.charAt(0).toUpperCase() || "") + title?.slice(1)|| []}
                    {post.username === user?.username && (
                         <div className = "singlePostEdit"> 
                        <FiEdit className="singlePostIcon" onClick={() => setUpdateMode(true)}/>
                        <RiDeleteBin6Line className="singlePostIcon"  onClick={handleDelete}/> 
                    </div>     
                )}
                </h1>
            )}
            <div className="singlePostInfo">
                <Link to= {`/?user=${post.username}`} className = "link">
                    <span className="singlePostAuthor"> Author : <b>{(post.username?.charAt(0).toUpperCase() || "") + (post.username?.slice(1)|| [])}</b></span>
                </Link>
                
                <span className="singlePostDate">{new Date (post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
                <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            ) : (
            <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
            )}  
        </div>
      
    </div>
)};

export default Singlepost;
