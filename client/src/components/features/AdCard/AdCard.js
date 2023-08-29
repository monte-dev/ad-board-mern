import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './AdCard.css';

const AdCard = ({ ad }) => {
	return (
		<Card className="mb-3">
			<Card.Body className="ad-card">
				<Card.Img
					src={`${process.env.PUBLIC_URL}/images/${ad.image}`}
					className="ad-card--image"
				></Card.Img>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>
				<Button variant="primary">View</Button>
			</Card.Body>
		</Card>
	);
};

export default AdCard;
