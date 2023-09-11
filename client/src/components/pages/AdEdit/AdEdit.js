import { useEffect, useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';

const AdEdit = () => {
	const { id } = useParams();
	const currentAd = useSelector((state) => getAdById(state, id));

	const [title, setTitle] = useState(currentAd.title);
	const [content, setContent] = useState(currentAd.content);
	const [image, setImage] = useState(currentAd.image);
	const [price, setPrice] = useState(currentAd.price);
	const [location, setLocation] = useState(currentAd.location);
	const [status, setStatus] = useState(null);

	const currentUser = localStorage.getItem('user');
	const sellerData = useSelector((state) => state.seller);
	const loggedInUser = useSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (!currentAd || !sellerData || currentAd.seller !== sellerData._id) {
			navigate('/');
		}
	}, [currentAd, sellerData, navigate]);

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
			method: 'PUT',
			body: fd,
		};

		setStatus('loading');

		fetch(`${API_URL}/ads/${id}`, options)
			.then((res) => {
				if (res.status === 200) {
					setStatus('success');
					setTimeout(() => {
						navigate('/');
					}, 1500);
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			})
			.catch((err) => {
				setStatus('serverError');
			});
	};

	return (
		<Form
			className="col-12 col-sm-8 mx-auto my-4 edit-ad-form"
			onSubmit={handleSubmit}
		>
			<h1>Edit an Ad</h1>

			{/* EDITING AD ALERT MESSAGES */}
			{status === 'clientError' && (
				<Alert variant="danger" className="my-3">
					<Alert.Heading>Missing/Incorrect Data</Alert.Heading>
					<p>All fields need to be correctly filled out.</p>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant="danger" className="my-3">
					<Alert.Heading>Server Error</Alert.Heading>
					<p>An unexpected error occurred while editing the ad.</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner
					animation="border"
					role="status"
					className="d-block mx-auto my-3"
				>
					<span className="visually-hidden">Editing ad...</span>
				</Spinner>
			)}

			<Form.Group controlId="formTitle">
				<Form.Label className="mt-3">Title:</Form.Label>
				<Form.Control
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter the title for your property"
				/>
			</Form.Group>
			<Form.Group controlId="formContent">
				<Form.Label className="mt-3">Description:</Form.Label>
				<Form.Control
					as="textarea"
					rows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter a description for your property"
				/>
			</Form.Group>
			<Form.Group controlId="formImage">
				<Form.Label className="mt-3">Image:</Form.Label>
				<Form.Control
					type="file"
					onChange={(e) => setImage(e.target.files[0])}
					accept="image/*"
				/>
			</Form.Group>
			<Form.Group controlId="formPrice">
				<Form.Label className="mt-3">Price:</Form.Label>
				<Form.Control
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Enter the asking price"
				/>
			</Form.Group>
			<Form.Group controlId="formLocation">
				<Form.Label className="mt-3">Location:</Form.Label>
				<Form.Control
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Enter location of your property"
				/>
			</Form.Group>
			<Button variant="primary" type="submit" className="my-3">
				Save Changes
			</Button>
		</Form>
	);
};
export default AdEdit;
