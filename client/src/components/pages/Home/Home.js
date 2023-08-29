import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { loadAdRequest } from '../../../redux/adsRedux';
import AdCard from '../../features/AdCard/AdCard';
import Searchbar from '../../features/Searchbar/Searchbar';
const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAdRequest());
	}, [dispatch]);
	const ads = useSelector((state) => state.ads);

	return (
		<main className="text-center container d-flex flex-column justify-content-center">
			<h2 className="mb-4">Ads</h2>
			<Searchbar></Searchbar>
			<Row>
				{ads.map((ad) => (
					<Col key={ad._id}>
						<AdCard ad={ad} />
					</Col>
				))}
			</Row>
		</main>
	);
};

export default Home;
