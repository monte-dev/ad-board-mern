import { useState } from 'react'
import {Form, Button, Spinner, Alert} from 'react-bootstrap'

const AdAdd = () => {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [image, setImage] = useState(null);
const [price, setPrice] = useState('');
const [location, setLocation] = useState('');
 
const [status, setStatus] = useState(null)

const handleSubmit= (e) => {
	console.log('added ad')
}

	return (
		<Form className='col-12 col-sm-8 mx-auto'onSubmit={handleSubmit}>
			<h1 className='my-4'>Post an ad</h1>

				{/* REGISTRATION ALERT MESSAGES */}


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


			<Form.Group className='mb-3' controlId='formTitle'>
				<Form.Label>Title: </Form.Label>
				<Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter the title for your property.'></Form.Control>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formContent'>
				<Form.Label>Description: </Form.Label>
				<Form.Control type='text' value={content} onChange={e => setContent(e.target.value)} placeholder='Enter a description for your property.'></Form.Control>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formImage'>
				<Form.Label>Image</Form.Label>
				<Form.Control type='file' value={image} onChange={e => setImage(e.target.files[0])} placeholder='Upload picture of the property'></Form.Control>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formPrice'>
				<Form.Label>Price</Form.Label>
				<Form.Control type='number' value={price} onChange={e => setPrice(e.target.value)} placeholder='Enter the asking price.'></Form.Control>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formLocation'>
				<Form.Label>Location</Form.Label>
				<Form.Control type='text' value={location} onChange={e => setLocation(e.target.value)} placeholder='Enter location of your property.'></Form.Control>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Post for free!
			</Button>
		</Form>
	);
			}
export default AdAdd;
