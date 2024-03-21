import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const HeaderNav = ({ isAuthenticated }) => {
	return (
		<header data-theme="dark">
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
						<Link to="/events">Events</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<button
							style={{ display: "none" }}
							type="button"
							onClick={() => console.log(Cookies.set("foo", "bar"))}
						>
							set cookie
						</button>
						<button
							style={{ display: "none" }}
							type="button"
							onClick={() => console.log(Cookies.get())}
						>
							get cookie
						</button>
						<button
							style={{ display: "none" }}
							type="button"
							onClick={() => console.log(Cookies.remove("jwtToken"))}
						>
							clear cookie
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default HeaderNav;
