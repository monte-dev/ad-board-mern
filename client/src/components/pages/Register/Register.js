import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';

const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhone] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(login, password, phoneNumber, avatar);

		const fd = new FormData();
		fd.append('login', login);
		fd.append('password', password);
		fd.append('avatar', avatar);
		fd.append('phoneNumber', phoneNumber);

		const option = {
			method: 'POST',
			body: fd,
		};

		setStatus('loading');
		fetch(`${API_URL}/auth/register`, option)
			.then((res) => {
				if (res.status === 201) {
					setStatus('success');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else if (res.status === 409) {
					setStatus('loginError');
				} else {
					setStatus('serverError');
				}
			})
			.catch((err) => {
				console.log('fetching error', err);
			});
	};

	return (
		<Form className="mt-5 col-12 col-sm-6 mx-auto" onSubmit={handleSubmit}>
			<h1 className="my-4 text-center">Sign up now</h1>

			{/* REGISTRATION ALERT MESSAGES */}
			{status === 'success' && (
				<Alert variant="success">
					<Alert.Heading>Success!</Alert.Heading>
					<p>
						You have been successfully registered! You may now log
						in...
					</p>
				</Alert>
			)}
			{status === 'serverError' && (
				<Alert variant="danger">
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Unexpected error... Try again!</p>
				</Alert>
			)}

			{status === 'loginError' && (
				<Alert variant="warning">
					<Alert.Heading>Login already in use</Alert.Heading>
					<p>User with this name already exists...</p>
				</Alert>
			)}

			{status === 'clientError' && (
				<Alert variant="danger">
					<Alert.Heading>Missing data</Alert.Heading>
					<p>You have to fill all the fields...</p>
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

			{/* FORM COMPONENT */}
			<Form.Group className="mb-3" controlId="formLogin">
				<Form.Label>Login</Form.Label>
				<Form.Control
					type="text"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					placeholder="Enter login"
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formPhone">
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					type="tel"
					value={phoneNumber}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Phone Number"
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formFile">
				<Form.Label>Upload avatar</Form.Label>
				<Form.Control
					type="file"
					onChange={(e) => setAvatar(e.target.files[0])}
				/>
			</Form.Group>
			<Button type="submit" variant="primary">
				Submit
			</Button>
		</Form>
	);
};
export default Register;
