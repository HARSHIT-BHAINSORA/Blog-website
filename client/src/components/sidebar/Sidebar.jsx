import React from "react";
import './sidebar.css';
import { FaFacebook} from 'react-icons/fa';
import {BsTwitter , BsInstagram } from 'react-icons/bs';
import {GrLinkedin} from 'react-icons/gr';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

function Sidebar() {

    const [cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async()=>{
        try{
            const res = await axios.get("/category");
              setCats(res.data);
            }
            catch(err) {
              console.log("Error ...");
              return err;
            }
          }
        getCats();
    }, [])

    console.log(cats);
  return (
    <div className="sidebar">
        <div className="sidebarItems">
            <span className="sidebarTitles">ABOUT ME</span>
            <img className="sidebar-image"src = {require("../image/person.jpg")} alt ="pic" />
            <p>Hi , I am Harshit Bhainsora from Dehradun Uttarakhand 
                Welcome to my Blog website.
            </p>
        </div>
        <div className="sidebarItems">
            <span className="sidebarTitles">CATEGORIES</span>
            <ul className="sidebarList">
          {cats.map((c) => (
                 <Link to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItems">
            <span className="sidebarTitles">FOLLOW US</span>
            <div className="sidebar-social">
                <FaFacebook  className="sidebar-Icons"/>
                <BsTwitter className="sidebar-Icons" />
                <GrLinkedin className="sidebar-Icons"/>
                <BsInstagram className="sidebar-Icons"/>
            </div>
        </div>
    </div>

)};

export default Sidebar;
