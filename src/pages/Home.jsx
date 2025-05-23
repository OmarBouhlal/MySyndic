import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
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

    const navigate = useNavigate();
    const [FirstName, setFirstname] = useState("");
    const [LastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Immeubles = ["Im1", "Im2", "Im3", "ImA2"];
    const ImmxApp = {
        ["Im1"]: ["App1", "App2", "App4"],
        ["Im2"]: ["App1", "App2"],
        ["Im3"]: ["App1", "App5"],
        ["ImA2"]: ["App1", "App6"]
    };

    const [ImmChoice, setImm] = useState(Immeubles[0]);
    const [AppChoice, setApp] = useState(ImmxApp[Immeubles[0]][0]);

    async function register(e) {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:3000/api/create", {
                email,
                Immeuble: ImmChoice,
                Appartement: AppChoice,
                FirstName,
                LastName,
                password,
            });
            console.log(resp.data);
        } catch (error) {
            console.error("Registration failed: ", error);
        }
    }

    async function login(e) {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:3000/api/get", {
                email,
                password
            });

            console.log(resp.data);
            if (resp.data) {
                navigate("/UserFactures");
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    }

    return (
        <>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={register}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="First Name" value={FirstName} onChange={e => setFirstname(e.target.value)} />
                        <input type="text" placeholder="Last Name" value={LastName} onChange={e => setLastname(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <select value={ImmChoice} onChange={e => {
                            setImm(e.target.value);
                            setApp(ImmxApp[e.target.value][0]);
                        }}>
                            {Immeubles.map((im, index) => <option key={index}>{im}</option>)}
                        </select>
                        <select value={AppChoice} onChange={e => setApp(e.target.value)}>
                            {ImmxApp[ImmChoice]?.map((ap, index) => <option key={index}>{ap}</option>)}
                        </select>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={login}>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Sign In</button>
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
                <p>&copy; 2025 Created by a Group of 3 Software Engineering Students of ENSAM
                    <a href="https://github.com/ValuryTry">
                        <img src="src/assets/task-portrait.jpg" style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                    </a>
                </p>
            </footer>
        </>
    );
}
