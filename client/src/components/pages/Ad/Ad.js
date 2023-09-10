import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Ad.css';
import { getAdById } from '../../../redux/adsRedux';
import { IMGS_URL } from '../../../config';
import { loadSellerRequest } from '../../../redux/sellerRedux';
const Ad = () => {
	const { id } = useParams();
	const sellerData = useSelector((state) => state.seller);
	const currentAd = useSelector((state) => getAdById(state, id));

	const dispatch = useDispatch();
	console.log(currentAd);

	useEffect(() => {
		if (currentAd) {
			dispatch(loadSellerRequest(currentAd.seller));
		}
	}, [dispatch, currentAd]);
	if (!currentAd) {
		return <div>Loading ad...</div>;
	}

	return (
		<div>
			<div className="ad-detail--user">
				<img
					className="ad-seller--image"
					alt="seller avatar"
					src={`${IMGS_URL}${sellerData.avatar}`}
				></img>

				<p>{currentAd.seller.login}</p>
				<p>{currentAd.seller.phoneNumber}</p>
			</div>
			<h2>{currentAd.title}</h2>
			<p>{currentAd.publishedDate}</p>
			<p>{currentAd.location}</p>
			<p>${currentAd.price.toLocaleString()}</p>
			<img
				src={`${IMGS_URL}${currentAd.image}`}
				className="ad-card--image"
				alt="house ad"
			></img>
			<p>{currentAd.content}</p>
		</div>
	);
};
export default Ad;
