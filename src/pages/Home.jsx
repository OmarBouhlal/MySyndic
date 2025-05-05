import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Home(){
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUp = () => container?.classList.add("right-panel-active");
        const handleSignIn = () => container?.classList.remove("right-panel-active");

        signUpButton?.addEventListener('click', handleSignUp);
        signInButton?.addEventListener('click', handleSignIn);

        return () => {
            signUpButton?.removeEventListener('click', handleSignUp);
            signInButton?.removeEventListener('click', handleSignIn);
        };
    }, []);
    //Register//
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const Immeubles=["Im1","Im2","Im3","ImA2"];
    // const App=["App1","App2","App4"];
    const ImmxApp = {
        [`${Immeubles[0]}`]: ["App1", "App2", "App4"],
        [`${Immeubles[1]}`]: ["App1", "App2"],
        [`${Immeubles[2]}`]: ["App1", "App5"],
        [`${Immeubles[3]}`]: ["App1", "App6"]
    };


    const [ImmChoice,setImm] = useState(Immeubles[0]);
    const [AppChoice,setApp] = useState();
    function register(e) {


    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeImmeuble = (e) => {
        setImm(e.target.value);

    }
    const handleChangeApp = (e) => {
        setApp(e.target.value);
    }

    //Register//

    //Login//

    //Login//








    return (
        <>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <input type="text" placeholder="FirstName" />
                            <input type="text" placeholder="LastName" />
                            <input type="email" placeholder="Email" onChange={(e)=>handleChangeEmail(e)}/>
                            <input type="password" placeholder="Password" onChange={(e)=>handleChangePassword(e)}/>
                            <select value={ImmChoice} onChange={(e)=>handleChangeImmeuble(e)}>
                                {Immeubles.map((im,index)=>{
                                    return <option key={index}>{im}</option>
                                })
                                }
                            </select>
                            <select value ={AppChoice} onChange={(e)=>handleChangeApp(e)}>
                                {ImmxApp[ImmChoice]?.map((map,index)=>{
                                    return <option key={index}>{map}</option>
                                })}
                            </select>
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p>
                        Created with <i className="fa fa-heart"></i> by
                        <a target="_blank" rel="noreferrer" href="https://florin-pop.com">Florin Pop</a>
                        - Read how I created this and how you can join the challenge
                        <a target="_blank" rel="noreferrer"
                           href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
                    </p>
                </footer>
   </>
    )
}