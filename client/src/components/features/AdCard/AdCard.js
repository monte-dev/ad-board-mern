import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './AdCard.css';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
const AdCard = ({ ad }) => {
	return (
		<Card className="mb-3 ad-card">
			<Card.Body className="ad-card--body">
				<Card.Img
					src={`${IMGS_URL}${ad.image}`}
					className="ad-card--image"
				></Card.Img>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>
				<NavLink to={`/ad/${ad._id}`}>
					<Button variant="primary">Read more</Button>
				</NavLink>
			</Card.Body>
		</Card>
	);
};

export default AdCard;
