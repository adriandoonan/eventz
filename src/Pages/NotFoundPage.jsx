import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="container">
			<h1 style={{ margin: "0 auto" }}>Page not found</h1>
			<img
				style={{ margin: "0 auto" }}
				src="https://c.tenor.com/KK8xVmSworgAAAAC/tenor.gif"
				alt="page not found"
			/>
			<h3 style={{ margin: "0 auto" }}>
				You must have zigged when you should have zagged
			</h3>
			<button
				type="button"
				onClick={() => navigate(-1)}
				style={{ margin: "0 auto" }}
			>
				Go back
			</button>
		</div>
	);
};
export default NotFoundPage;
