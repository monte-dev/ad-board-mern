import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../../../config';
const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhone] = useState('');
	const [avatar, setAvatar] = useState(null);
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

		fetch(`${API_URL}/auth/register`, option);
	};

	return (
		<Form className="mt-5 col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
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
