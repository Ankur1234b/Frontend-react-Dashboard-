import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
function Nav() {
 const auth=localStorage.getItem('user')
 const navigate=useNavigate()
 const logout=()=>{
  localStorage.clear();
  navigate('/signup')
 }
  return (
    <div>
    <img alt="logo" className='logo'src="https://yt3.googleusercontent.com/ytc/AIf8zZSqnIyhDK5VunVEGU72m8PM1zQyjziEvWD1w3sIyg=s900-c-k-c0x00ffffff-no-rj"></img>
      {auth?<ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add product</Link></li>
        <li><Link to="/update">Update product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        {/* <li>{auth?<Link onClick={logout} to="/signup">Logout</Link> :
        <Link to="/signup">Sign Up</Link>}</li>
        <li><Link to="/login">Login</Link></li> */}
       </ul>
      :
      <ul  className='nav-ul nav-right'>
      <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav
