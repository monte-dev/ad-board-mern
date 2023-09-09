import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { API_URL } from '../../../config';
const AdAdd = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [status, setStatus] = useState(null);
	const currentUser = localStorage.getItem('user');
	console.log('logged in user:', currentUser);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('added ad');

		// const currentDate = new Date();
		// const formattedDate = currentDate.toISOString();
		const fd = new FormData();
		fd.append('title', title);
		fd.append('content', content);
		fd.append('image', image);
		fd.append('price', price);
		fd.append('location', location);
		fd.append('seller', currentUser);
		console.log('FormData Content:', [...fd.entries()]);

		const options = {
			method: 'POST',
			credentials: 'include',
			body: fd,
		};
		setStatus('loading');
		fetch(`${API_URL}/ads`, options)
			.then((res) => {
				if (res.status === 201) {
					setStatus('success');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					console.log('FormData Content: after', [...fd.entries()]);

					setStatus('serverError');
				}
			})
			.catch((err) => {
				console.log('------error-------', err);
				setStatus('serverError');
			});
	};

	return (
		<Form className="col-12 col-sm-8 mx-auto" onSubmit={handleSubmit}>
			<h1 className="my-4">Post an ad</h1>

			{/* ADDING AD ALERT MESSAGES */}

			{status === 'clientError' && (
				<Alert variant="danger">
					<Alert.Heading>Missing/Incorrect data</Alert.Heading>
					<p>All fields need to be correctly filled out.</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner
					animation="border"
					role="status"
					className="d-block mx-auto"
				>
					<span className="visually-hidden">Adding ad...</span>
				</Spinner>
			)}

			<Form.Group className="mb-3" controlId="formTitle">
				<Form.Label>Title: </Form.Label>
				<Form.Control
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter the title for your property."
				></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formContent">
				<Form.Label>Description: </Form.Label>
				<Form.Control
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter a description for your property."
				></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formImage">
				<Form.Label>Image</Form.Label>
				<Form.Control
					type="file"
					onChange={(e) => setImage(e.target.files[0])}
					placeholder="Upload picture of the property"
				></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Enter the asking price."
				></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formLocation">
				<Form.Label>Location</Form.Label>
				<Form.Control
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Enter location of your property."
				></Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Post for free!
			</Button>
		</Form>
	);
};
export default AdAdd;
