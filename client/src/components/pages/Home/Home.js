import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getNewestAds, loadAdRequest } from '../../../redux/adsRedux';
import AdCard from '../../features/AdCard/AdCard';
import Searchbar from '../../features/Searchbar/Searchbar';
import './Home.css';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAdRequest());
	}, [dispatch]);
	const ads = useSelector(getNewestAds);

	return (
		<main className="text-center container d-flex flex-column justify-content-center">
			<h2 className="home-title">Ads</h2>
			<Searchbar />

			<Row>
				{ads.map((ad) => (
					<Col
						key={ad._id}
						className="d-flex justify-content-center mx-3 my-2"
					>
						<AdCard className="card" ad={ad} />
					</Col>
				))}
			</Row>
		</main>
	);
};

export default Home;
