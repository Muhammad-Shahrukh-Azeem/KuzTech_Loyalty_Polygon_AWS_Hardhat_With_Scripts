import React from 'react'
import Link from 'next/link'
 
const Navbar = () => {
    return (
        <nav>
            <ul>
                <Link href='/'><li>Main</li></Link>
                <Link href='/BuyTokens'><li>BuyTokens</li></Link>

            </ul>
        </nav>
    )
}
 
export default Navbar
