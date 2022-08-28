import React, { useState } from "react";
import { useEffect } from "react";
import Headers from "../../header/Header"
import Posts from "../../posts/Posts";
import Sidebar from "../../sidebar/Sidebar";
import './home.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Home() {

  const [posts , setPosts] = useState([]);
  const {search}=  useLocation();


  useEffect(() =>{
    const fetchPosts = async()=>{
      try{
      const res = await axios.get("/posts" + search);
        setPosts(res.data);
      }
      catch(err) {
        console.log("Error ...");
        return err;
      }
    }
    fetchPosts()
  } , [search]);

  return( 
    <div>
      <Headers />
      <div className = "home">
        <Posts posts ={posts}/>
        <Sidebar />
      </div>
    </div>
)};

export default Home;
