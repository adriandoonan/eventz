import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="container">
			<h1>Page not found</h1>
			<img
				src="https://c.tenor.com/KK8xVmSworgAAAAC/tenor.gif"
				alt="page not found"
			/>
			<h3>You must have zigged when you should have zagged</h3>
			<button type="button" onClick={() => navigate(-1)}>
				Go back
			</button>
		</div>
	);
};
export default NotFoundPage;
