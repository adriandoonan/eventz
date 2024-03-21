import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer data-theme="dark">
			<nav id="footer-nav">
				<ul>
					<li>
						<small>
							Copyright&nbsp;©&nbsp;{new Date().getFullYear()}{" "}
							&nbsp;Eventz&nbsp;Cooperative
						</small>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/submit-event">Submit event</Link>
					</li>
					<li>
						<Link to="/impressum">Impressum</Link>
					</li>
					<li>
						<Link to="/admin">Sign in</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
export default Footer;
