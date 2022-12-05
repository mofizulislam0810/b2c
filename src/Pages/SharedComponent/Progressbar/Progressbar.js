import React from 'react';
import './Progressbar.css'

const Progressbar = (props) => {
    var fClass="";
    var sClass="";
    var tClass="";
    var dfClass="";
    var dsClass="";
    var dtClass="";
    
    if(props.flag===1){
        fClass="active";
        sClass="";
        tClass="";
        dfClass="";
        dsClass="";
        dtClass="";
    }
   else if(props.flag===2){
        fClass="done";
        sClass="active";
        tClass="";
        dfClass="fa fa-check";
        dsClass="";
        dtClass="";
    }
    else  if(props.flag===3){
        fClass="done";
        sClass="done";
        tClass="done";
        dfClass="fa fa-check";
        dsClass="fa fa-check";
        dtClass="fa fa-check";
    }

    return (
      <div>
          <div className="row">
            <ul className="progressbar">
              <li className={fClass}>
                <span className={dfClass}></span>Enter your details
              </li>
              <li className={sClass}>
                <span className={dsClass}></span>Make payment
              </li>
              <li className={tClass}>
                <span className={dtClass}></span>Ticket confirmed
              </li>
            </ul>
          </div>
      </div>
    );
};

export default Progressbar;