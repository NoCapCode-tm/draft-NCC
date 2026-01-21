import React from 'react'
import styles from "../CSS/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
       <div className={styles.logo}>
        <img src="/Companylogo.png" alt="/" height="150%" width="150%"/>
       </div>
       <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Case Studies</li>
        <button className={styles.navbutt}>Get in touch</button>
       </ul>
    </div>
  )
}

export default Navbar
