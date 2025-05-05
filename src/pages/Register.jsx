import {useState } from "react";
import {useNavigate} from "react-router-dom";


export default function Register(){
    const accounts = [{email:"tahaben@gmail.com" , password : "1234", Imm : "Im1" , App : "App1"},{email:"omarBouhlal@gmail.com" , password : "12345", Imm : "Im1" , App : "App2"}]
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
        e.preventDefault();
        accounts.push({email : email ,password : password , Imm : ImmChoice , App : AppChoice });
        console.log(accounts);
        localStorage.setItem("accounts",JSON.stringify(accounts));
        navigate("/login");


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
    return (
        <>
          <form id="registerForm" onSubmit={(e) => register(e)}>
              <input type="email" value={email}  onChange={(e)=>handleChangeEmail(e)}  required/>
                  <input type="password"  value={password} onChange={(e) => handleChangePassword(e)} required/>
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
              <button type="submit">Register</button>
          </form>
        </>
    )
}