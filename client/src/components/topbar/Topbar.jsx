import React , {useEffect ,useState} from "react";
import "./topbar.css";
import { FaFacebook} from 'react-icons/fa';
import {BsTwitter , BsInstagram ,BsSearch} from 'react-icons/bs';
import {GrLinkedin} from 'react-icons/gr';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";



function TopBar() {
 
    const [show, handleshow] = useState(false);
    const { user , dispatch } = useContext(Context);
    const PF = "http://localhost:4000/images/"
  
    const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      console.log()
    };

    useEffect(() => {
        const handleScroll = (event) => {
          if (window.scrollY > 30) {
            handleshow(true);
          } else {
            handleshow(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);


  return( 
    <div className ={`top ${show && "top_grey"}`}>
        <div className="topLeft">
        <FaFacebook  className="topIcons"/>
        <BsTwitter className="topIcons" />
        <GrLinkedin className="topIcons"/>
        <BsInstagram className="topIcons"/>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <Link className="link" to={"/"}><li className="topListItem">HOME</li></Link>
                <Link className="link" to={"/"}><li className="topListItem">ABOUT</li></Link>
                <Link className="link" to={"/"}><li className="topListItem">CONTACT</li></Link>
                <Link className="link" to={"/write"}><li className="topListItem">WRITE</li></Link>
                <li className="topListItem" onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>
            </ul>    
        </div>
        <div className="topRight">
          {user ? 
          (
             <Link className="link" to="/settings">
                <img className= "avatar" src={PF+user.profilePic} alt ="avtar"></img>
            </Link>
          ) :(
            <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
          )
          }

          <BsSearch className="topSearchIcon" />
          
            
            
        </div>
      
    </div>
)};

export default TopBar;
