import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSearchedAds } from '../../../redux/adsRedux';
import AdCard from '../../features/AdCard/AdCard';
import { Row, Col } from 'react-bootstrap';
const SearchResults = () => {
	const dispatch = useDispatch();
	const { searchPhrase } = useParams();
	const ads = useSelector((state) => state.ads);
	const searchedAds = ads.filter(
		(ad) =>
			ad.title?.toLowerCase()?.includes(searchPhrase.toLowerCase()) ||
			false ||
			ad.location
				?.toLowerCase()
				?.includes(searchPhrase.toLowerCase() || false)
	);

	useEffect(() => {
		dispatch(loadSearchedAds(searchPhrase));
	}, [dispatch, searchPhrase]);

	return (
		<div>
			<h2 className="my-3">Search results for: {searchPhrase}</h2>
			<Row>
				{searchedAds.map((ad) => (
					<Col
						key={ad._id}
						className="d-flex justify-content-center mx-3 my-2"
					>
						<AdCard ad={ad} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default SearchResults;
