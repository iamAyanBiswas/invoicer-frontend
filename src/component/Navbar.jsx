import { NavLink } from "react-router-dom";
import './Navbar.css'
function Navbar(){


    return(
        <div>
            <ul className="nav-bar">
                <li className='invoicer'><NavLink  to='/'>Invoicer</NavLink></li>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
                <li><NavLink to='/privacy-policy'>Privacy Policy</NavLink></li>
            </ul>
            <ul className="side-bar" id="sideBar">
                <li onClick={()=>{document.getElementById('sideBar').style.display='none';}}><span className="material-symbols-outlined">
                close
                </span></li>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to='/contact'>Contact</NavLink></li>
                <li><NavLink to='/privacy-policy'>Privacy Policy</NavLink></li>
            </ul>
            <ul className="mob-nav-bar">
                <li className="openx" >
                    <span  onClick={()=>{document.getElementById('sideBar').style.display='flex';}}  className="material-symbols-outlined">menu</span>
                </li>
                <li className="mob-invoicer"><NavLink  to='/'>Invoicer</NavLink></li>
            </ul>
        </div>
    )
}
export default Navbar