import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../redux/userRedux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	const loggedIn = useSelector(getCurrentUser);
	console.log(loggedIn);

	return (
		<>
			<nav>
				<Navbar className="d-flex justify-content-between bg-info rounded-top-3">
					<Navbar.Brand as={NavLink} to="/">
						Real Estate Listings
					</Navbar.Brand>
					<Nav>
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						{loggedIn ? (
							<>
								<Nav.Link as={NavLink} to="/ad/add">
									New Ad
								</Nav.Link>
								<Nav.Link as={NavLink} to="/logout">
									Log out
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to="/register">
									Sign up
								</Nav.Link>
								<Nav.Link as={NavLink} to="/login">
									Sign in
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar>
			</nav>
		</>
	);
};
export default NavBar;
