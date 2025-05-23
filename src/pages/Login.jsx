import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const handleChangePassword  = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeEmail  = (e) => {
        setEmail(e.target.value);
    }
    const login = (e) => {
        e.preventDefault();
        console.log(1);
        const verifyAccount = accounts.find((acc)=>  acc.email === email
        && acc.password === password );
        console.log(verifyAccount);
        if (verifyAccount) {
            console.log("Login successful! Redirecting to Home...");
            localStorage.setItem("user",JSON.stringify(verifyAccount));
            navigate("/home");
            // Typically you would redirect here or set some auth state
        } else {
            console.log("Login failed!");
        }
    }

}