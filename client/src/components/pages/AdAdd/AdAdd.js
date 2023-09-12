import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const AdAdd = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [status, setStatus] = useState(null);
	const currentUser = localStorage.getItem('user');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const fd = new FormData();
		fd.append('title', title);
		fd.append('content', content);
		fd.append('image', image);
		fd.append('price', price);
		fd.append('location', location);
		fd.append('seller', currentUser);

		const options = {
			method: 'POST',
			credentials: 'include',
			body: fd,
		};

		setStatus('loading');

		fetch(`${API_URL}/ads`, options)
			.then((res) => {
				if (res.status === 200) {
					setStatus('success');
					setTimeout(() => {
						navigate('/');
					}, 1500);
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					console.log('servererrrrrrrrrr');
					setStatus('serverError');
				}
			})
			.catch((err) => {
				setStatus('serverError');
			});
	};

	return (
		<Form className="col-12 col-sm-8 mx-auto my-4" onSubmit={handleSubmit}>
			<h1 className="my-4">Post an ad</h1>

			{/* ADDING AD ALERT MESSAGES */}
			{status === 'clientError' && (
				<Alert variant="danger" className="my-3">
					<Alert.Heading>Missing/Incorrect data</Alert.Heading>
					<p>All fields need to be correctly filled out.</p>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant="danger" className="my-3">
					<Alert.Heading>Server Error</Alert.Heading>
					<p>An unexpected error occurred while adding the ad.</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner
					animation="border"
					role="status"
					className="d-block mx-auto my-3"
				>
					<span className="visually-hidden">Adding ad...</span>
				</Spinner>
			)}

			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Title:</Form.Label>
				<Form.Control
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter the title for your property"
				/>
			</Form.Group>
			<Form.Group controlId="formContent" className="mb-3">
				<Form.Label>Description:</Form.Label>
				<Form.Control
					type="text"
					as="textarea"
					rows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter a description for your property"
				/>
			</Form.Group>
			<Form.Group controlId="formImage" className="mb-3">
				<Form.Label>Image:</Form.Label>
				<Form.Control
					type="file"
					onChange={(e) => setImage(e.target.files[0])}
					placeholder="Upload picture of the property"
				/>
			</Form.Group>
			<Form.Group controlId="formPrice" className="mb-3">
				<Form.Label>Price:</Form.Label>
				<Form.Control
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Enter the asking price"
				/>
			</Form.Group>
			<Form.Group controlId="formLocation" className="mb-3">
				<Form.Label>Location:</Form.Label>
				<Form.Control
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Enter location of your property"
				/>
			</Form.Group>
			<Button variant="primary" type="submit" className="my-3">
				Post for free!
			</Button>
		</Form>
	);
};
export default AdAdd;
