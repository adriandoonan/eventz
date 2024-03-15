import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const HeaderNav = ({ isAuthenticated }) => {
	return (
		<header>
			<nav id="main-nav">
				<ul>
					<li>
						<Link to="/">
							<strong>Eventz!</strong>{" "}
							{isAuthenticated && <span>with auth!</span>}
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
					<li>
						<button
							type="button"
							onClick={() => console.log(Cookies.set("foo", "bar"))}
						>
							set cookie
						</button>
						<button type="button" onClick={() => console.log(Cookies.get())}>
							get cookie
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default HeaderNav;
