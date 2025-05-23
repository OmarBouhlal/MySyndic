import '../css/Home.css';
import UserNavBar from "../components/NavBar/UserNavBar.jsx";
import LayoutAdminDashboard from "../components/LayoutDashboard/LayoutAdminDashboard.jsx";
import LayoutUserDashboard from "../components/LayoutDashboard/LayoutUserDashboard.jsx";
export default function Dashboard() {
    const Admin = true;
    let Output;
            // Conditional Rendering , just theorical Right Now
            if(Admin){
                    Output = <>
                    <UserNavBar/>
                    <LayoutAdminDashboard/>
                    </>
            }
            else{
                Output = <>
            <UserNavBar/>
            <LayoutUserDashboard/>
                    </>
            }




    return (Output);
}
