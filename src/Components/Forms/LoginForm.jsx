export const LoginForm = ({
	handleLogin,
	badUsername,
	badPassword,
	userDetails,
	setUserDetails,
	setIsAuthenticated,
}) => {
	return (
		<form id="login-form" onSubmit={handleLogin}>
			<label htmlFor="email">Email address</label>
			<input
				type="email"
				name="email"
				autoComplete="username"
				value={userDetails.email}
				className={badUsername ? "form-bad-input" : ""}
				onChange={(e) =>
					setUserDetails({ ...userDetails, email: e.target.value })
				}
				required
			/>
			{badUsername && (
				<small id="email-helper">
					Can't find a user with that email address.
				</small>
			)}
			<label htmlFor="username">Password</label>
			<input
				type="password"
				name="password"
				autoComplete="current-password"
				value={userDetails.password}
				className={badPassword ? "form-bad-input" : ""}
				onChange={(e) =>
					setUserDetails({ ...userDetails, password: e.target.value })
				}
				required
			/>
			{badPassword && <small id="password-helper">Password incorrect.</small>}

			<footer role="group">
				<button type="submit">Log In</button>
				<button
					type="button"
					className="contrast"
					onClick={(event) => {
						console.log(event);
						event.target.closest("dialog").close();
					}}
				>
					Close
				</button>
			</footer>
		</form>
	);
};
