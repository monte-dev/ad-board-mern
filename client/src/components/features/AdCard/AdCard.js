import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './AdCard.css';

const AdCard = ({ ad }) => {
	return (
		<Card>
			<Card.Body className="ad-card">
				<Card.Img src={ad.image} className="ad-card--image"></Card.Img>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>
				<Button variant="primary">View</Button>
			</Card.Body>
		</Card>
	);
};

export default AdCard;
