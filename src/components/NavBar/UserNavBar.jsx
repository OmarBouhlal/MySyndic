import '../../css/NavBar.scss'
import { CgProfile } from "react-icons/cg";
import { MdFactCheck } from "react-icons/md";
export default function UserNavBar(){
    return(<>
        <nav className="navbar">
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><i><CgProfile size={25}/></i><span>Infos</span></a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><i><MdFactCheck size={25}/></i><span>Factures</span></a>
                </li>
            </ul>
        </nav>
    </>)
}