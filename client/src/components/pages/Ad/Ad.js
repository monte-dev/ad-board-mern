import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Ad.css';
import { getAdById } from '../../../redux/adsRedux';
import { API_URL, IMGS_URL } from '../../../config';
import { loadSellerRequest } from '../../../redux/sellerRedux';
import { Button, Spinner } from 'react-bootstrap';

const Ad = () => {
	const { id } = useParams();
	const currentAd = useSelector((state) => getAdById(state, id));
	const sellerData = useSelector((state) => state.seller);
	const loggedInUser = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(currentAd);

	useEffect(() => {
		if (currentAd) {
			dispatch(loadSellerRequest(currentAd.seller));
		}
	}, [dispatch, currentAd]);
	console.log(id);

	const handleBtnRemove = () => {
		const options = {
			method: 'DELETE',
		};
		fetch(`${API_URL}/ads/${id}`, options)
			.then((res) => {
				if (res.status === 200) {
					console.log('deleted');
					setTimeout(() => {
						navigate('/');
					}, 1000);
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.catch((error) => {
				console.error(
					'There was a problem with the fetch operation:',
					error
				);
			});
	};
	if (!currentAd || !sellerData) {
		return (
			<div className="my-5 text-center">
				<Spinner></Spinner>
				<span className="ms-2">Loadin ad...</span>
			</div>
		);
	}

	return (
		<>
			<div className="ad-detail mt-4">
				<div className="ad-seller d-flex flex-column">
					{loggedInUser !== null &&
					sellerData.login === loggedInUser.login ? (
						<div className="mb-2">
							<Button variant="info" className="w-25">
								Edit
							</Button>
							<Button
								variant="danger"
								className="ms-1 w-35"
								onClick={() => handleBtnRemove(currentAd._id)}
							>
								Delete
							</Button>
						</div>
					) : (
						<></>
					)}
					<img
						className="ad-seller--image"
						alt="seller avatar"
						src={`${IMGS_URL}${sellerData.avatar}`}
					></img>

					<p>{sellerData.login}</p>
					<p>{sellerData.phoneNumber}</p>
				</div>
				<div className="ad-detail--content">
					<h2>{currentAd.title}</h2>
					<p>{currentAd.publishedDate}</p>
					<img
						src={`${IMGS_URL}${currentAd.image}`}
						className="ad-detail--image"
						alt="house ad"
					></img>
					<p>{currentAd.location}</p>
					<p>${currentAd.price.toLocaleString()}</p>
					<p>{currentAd.content}</p>
				</div>
			</div>
		</>
	);
};
export default Ad;
