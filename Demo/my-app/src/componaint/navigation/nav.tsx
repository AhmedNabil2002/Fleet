'use client'
import "./nav.css"
import Link from 'next/link'
function Nav() {
  return (
    <nav className={"navbar"}>
        <ul className={"nav-links"}>
            <li><Link href="/" className={"contact-btn"}>الرئيسيه</Link></li>
            <li><Link href="/about">تواصل معنا</Link></li>
            <li><Link href="/contect">من نحن</Link></li>
        </ul>
        
        <div className={"logo"}>
            <div className={"logo-icon"}>F</div>
            <div>
                <div className={"logo-text"}>Fleet Gate</div>
                <div className={"logo-subtext"}>Express</div>
            </div>
        </div>
    </nav>
  )
}

export default Nav