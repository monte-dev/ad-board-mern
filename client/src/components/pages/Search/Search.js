import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { useEffect, useState } from 'react';
import loadSearchedAd from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
const Search = () => {
	const { searchPhrase } = useParams();
	console.log('Search parameter:', searchPhrase);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSearchedAd(searchPhrase));
	}, [dispatch, searchPhrase]);

	const [searchResult, setSearchResult] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/ads/search/${searchPhrase}`)
			.then((res) => res.json())
			.then((searchedAds) => setSearchResult(searchedAds));
	}, [searchPhrase]);

	console.log('searched ads', searchResult);

	if (!searchResult) return <div>{`no results for ${searchResult}`}</div>;

	return (
		<div>
			<h1>You searched for: {searchPhrase}</h1>
		</div>
	);
};

export default Search;
