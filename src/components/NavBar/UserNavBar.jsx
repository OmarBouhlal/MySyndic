import '../../css/NavBar.scss'
import { CgProfile } from "react-icons/cg";
import { MdFactCheck } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaAddressBook } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserNavBar(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            
            const response = await axios.get('http://localhost:3000/api/logout', {}, {
                withCredentials: true 
            });
            
            console.log(response.data.message); 
            
           
            
            navigate('/');
            
        } catch (error) {
            console.error('Logout failed:', error);
            
        }
    };
    
    return(<>
        <nav className="navbar">
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <a href="/Profile" className="navbar__link"><i><CgProfile size={25}/></i><span>Infos</span></a>
                </li>
                <li className="navbar__item">
                  <a
        href="#"
        className="navbar__link"
        onClick={e => {
            e.preventDefault();
            const role = localStorage.getItem('role');
            if (role === "admin" || role === "true" || role === true) {
                navigate('/AdminFactures');
            } else {
                navigate('/UserFactures');
            }
        }}
    >
        <i><MdFactCheck size={25}/></i><span>Factures</span>
    </a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link" onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}><i><CiLogout size={25}/></i><span>LogOut</span></a>
                </li>
                 <li className="navbar__item">
                    <a href="#" className="navbar__link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/residents')
                    }}><i><FaAddressBook size={25}/></i><span>Residents</span></a>
                </li>
            </ul>
        </nav>
    </>)
}