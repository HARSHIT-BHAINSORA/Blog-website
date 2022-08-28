import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import Singlepost from "../../singlePost/Singlepost";
import './single.css';


function Single() {
  return (
    <div className="single">
        <Singlepost />
        <Sidebar />
    </div>
  )
};

export default Single;
