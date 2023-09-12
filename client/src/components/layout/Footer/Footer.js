import React from 'react';
import '../../../styles/App.css';
const Footer = () => {
	return (
		<footer className="bg-dark text-light py-3">
			<div className=" text-center d-flex justify-content-center">
				<p className="me-2">Made by </p>
				<p>
					<a
						className="footer-link"
						href="https://github.com/monte-dev"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fab fa-github"></i>
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
