import React from "react";

export default function Login() {
    return(
        <div className="login">
            <form>
                <label>Username : </label>   
                <input type="text" placeholder="Enter Username" name="username" required/>
                <label>Password : </label>   
                <input type="password" placeholder="Enter Password" name="password" required/>  
                <button className='submit' type="submit" onclick ="LoginFunction()">Login</button>   
                {/* <input type="checkbox" checked="checkbox"> Remember me </input>   */}
                <button  type="button" className="cancelbtn" onclick ="CancelFunction()"> Cancel</button>   
                <a href="#">Forgot password? </a> 
            </form>
        </div>  
    )
}



var username = document.getElementsByName("username");
var password = document.getElementsByName("password");

function LoginFunction() {
    
}

function CancelFunction() {
    
}