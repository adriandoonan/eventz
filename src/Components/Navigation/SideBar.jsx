import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <aside id="sidebar">
    {" "}
    <nav>
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
  </aside>
  )
}
export default SideBar