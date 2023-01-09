import React, { useState } from 'react';
import './resetpass.css';
import Authblock from "../components/authblock";
import Input from "../components/authinput";
import Heading from "../components/heading";
import axios from 'axios';
import Loader from "../../loader";
const illustration: string = require("../images/setpass.svg").default;



function Passwordset(){

    const [password,setpassword] =useState("");
    const [password2,setpassword2] =useState("");
    const [loading,setLoading]=useState(false);
    const email = localStorage.getItem("email");
    const otp = localStorage.getItem("otp")
    const rightpass = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/

    function handlepass(e:any){
        setpassword(e.target.value);
    }

    function handlepass2(e:any){
        setpassword2(e.target.value);
    }

    function handleapi(){
        setLoading(true);
        if(password===password2)
        {
            axios.put("https://linkedin-back.azurewebsites.net/auth/password/forget/",{
            email:email,
            new_password:password,
            otp:otp
            }).then((res) => {
                console.log(res.data);
                setLoading(false);
              })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                }
                );
            localStorage.clear();
        }
        else
        {console.log("passwords not matching");
        setLoading(false);}
    }

    return <div>
        {loading?<Loader />:<div>
       <Heading /> 
       <img className='svgsetpass' id='svg1' src={illustration} alt="" />
       <div id="setpass" >
       <div><h1 className='topline'>Reset password?</h1>
            <p className='middle'>No worries, reset password anytime</p></div>
            <Input   onchange={handlepass} type="password" lable="Password" placeholder="Enter Password" message="Required Field" />
            <Input  onchange={handlepass2} type="password" lable="Confirm-Password" placeholder="Enter Password" message="Required Field" />
            <br />
            <Authblock onclick={handleapi} name="Save"/>
            <pre>Cancel</pre>
            
       </div>
       <img className='svgsetpass' id='svg2' src={illustration} alt="" />
    </div>}
    </div>
}
export default Passwordset;