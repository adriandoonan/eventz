import { Link } from "react-router-dom";
import { makeToast } from "../../App";

const Footer = () => {
	return (
		<footer>
			<nav id="footer-nav">
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
						<Link to="/impressum">Impressum</Link>
					</li>
					<li>
						<button type="button" onClick={() => makeToast("foo")}>
							I'm hungry
						</button>
					</li>
				</ul>
				<small>
					Copyright&nbsp;©&nbsp;{new Date().getFullYear()}
					&nbsp;Eventz&nbsp;Cooperative
				</small>
			</nav>
		</footer>
	);
};
export default Footer;
