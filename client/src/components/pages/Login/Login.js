import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../../redux/userRedux';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		};

		setStatus('loading');
		fetch(`${API_URL}/auth/login`, options)
			.then((res) => {
				if (res.status === 200) {
					setStatus('success');
					localStorage.setItem('user', login);

					dispatch(logIn({ login }));
					navigate('/');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			})
			.catch((err) => {
				console.log('fetching error', err);
				setStatus('serverError');
			});
	};

	return (
		<Form className="col-12 col-sm-4 mx-auto" onSubmit={handleSubmit}>
			<h1 className="my-4">Login</h1>
			<p className="text-center">test account:</p>
			<p className="text-center">'JohnDoe3' , 'tester3'</p>

			{/* REGISTRATION ALERT MESSAGES */}
			{status === 'success' && (
				<Alert variant="success">
					<Alert.Heading>Success!</Alert.Heading>
					<p>You have successfully logged in!</p>
				</Alert>
			)}
			{status === 'serverError' && (
				<Alert variant="danger">
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Unexpected error... Try again!</p>
				</Alert>
			)}

			{status === 'clientError' && (
				<Alert variant="danger">
					<Alert.Heading>Incorrect login details</Alert.Heading>
					<p>Incorrect password or login...</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner
					animation="border"
					role="status"
					className="d-block mx-auto"
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}

			<Form.Group className="mb-3" controlId="formLogin">
				<Form.Label>Login</Form.Label>
				<Form.Control
					type="text"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					placeholder="username..."
				></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password..."
				></Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
export default Login;
