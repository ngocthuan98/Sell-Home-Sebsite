import '../style/navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../picture/anh1.jpg'
import { auth } from '../firebase'

function Navbar() {
  return (
    <div className="navbar">
      <div className="menu">
        <div className="menu-list">
          <Link to="./buy">Buy</Link>
          <Link to="./sell/content">Sell</Link>
          <Link to="./agent">Agent finder</Link>
          <Link to="./contact">Contact</Link>
        </div>
        <Link to="./">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="btn">
          <select name="btn-bnb" className="btn-bnb">
            <option value="BNB Smart Chain">BNB Smart Chain</option>
            <option value="saab">Ethereum</option>
          </select>
          <button className="btn-wallet">Connect wallet</button>
          <button
            className="btn-logout"
            onClick={() => {
              auth.signOut()
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
