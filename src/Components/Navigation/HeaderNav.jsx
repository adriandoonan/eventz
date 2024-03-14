import { Link } from "react-router-dom"

const HeaderNav = () => {
  return (
    <header>
    <nav id="main-nav">
      <ul>
        <li>
            <Link to="/">
          <strong>Eventz!</strong>

            </Link>
        </li>
      </ul>
      <ul>
        <li>
            <Link to="/about">About</Link>
          
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/events-calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}
export default HeaderNav