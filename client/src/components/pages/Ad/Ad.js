import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';

const Ad = ({ ad }) => {
	const { id } = useParams();
	console.log(id);
	const currentAd = useSelector((state) => getAdById(state, id));
	console.log(currentAd);

	if (!currentAd) {
		return <div>Loading ad...</div>;
	}

	return (
		<div>
			<div className="ad-detail--user">
				{/* FIX Bug copy files uploaded on server to client side */}
				<img alt="seller avatar" src={`${process.env.PUBLIC_URL}/uploads/${currentAd.seller.avatar}`}></img>
				<p>{currentAd.seller.login}</p>
				<p>{currentAd.seller.phoneNumber}</p>
			</div>
			<h2>{currentAd.title}</h2>
			<p>{currentAd.publishedDate}</p>
			<p>{currentAd.location}</p>
			<p>${currentAd.price.toLocaleString()}</p>
			<img
				src={`${process.env.PUBLIC_URL}/images/${currentAd.image}`}
				className="ad-card--image"
				alt="house ad"
			></img>
			<p>{currentAd.content}</p>
		</div>
	);
};
export default Ad;
