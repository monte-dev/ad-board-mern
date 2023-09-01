import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSearchedAds } from '../../../redux/adsRedux';
import AdCard from '../../features/AdCard/AdCard';

const SearchResults = () => {
	const dispatch = useDispatch();
	const { searchPhrase } = useParams();
	const ads = useSelector((state) => state.ads);
	const searchedAds = ads.filter(
		(ad) =>
			ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
			ad.location.toLowerCase().includes(searchPhrase.toLowerCase())
	);

	useEffect(() => {
		dispatch(loadSearchedAds(searchPhrase));
	}, [dispatch, searchPhrase]);

	return (
		<div>
			<h2>Search results for: {searchPhrase}</h2>
			<div className="ad-list">
				{searchedAds.map((ad) => (
					<AdCard key={ad._id} ad={ad} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
