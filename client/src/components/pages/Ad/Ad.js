import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Ad.css';
import { getAdById } from '../../../redux/adsRedux';
import { API_URL, IMGS_URL } from '../../../config';
import { loadSellerRequest } from '../../../redux/sellerRedux';
import { Row, Col, Button, Spinner } from 'react-bootstrap';

const Ad = () => {
	const { id } = useParams();
	const currentAd = useSelector((state) => getAdById(state, id));
	const sellerData = useSelector((state) => state.seller);
	const loggedInUser = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentAd) {
			dispatch(loadSellerRequest(currentAd.seller));
		}
	}, [dispatch, currentAd]);

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
					}, 300);
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

	const handleBtnEdit = (id) => {
		navigate(`/ad/edit/${id}`);
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
			<Row className="ad-container mb-3">
				{/* Seller Information */}
				<Col md={4} xs={12}>
					<div className="ad-seller-info mb-4">
						{loggedInUser !== null &&
						sellerData.login === loggedInUser.login ? (
							<div className="mb-2">
								<Button
									variant="info"
									className="ad-btn"
									onClick={() => handleBtnEdit(currentAd._id)}
								>
									Edit
								</Button>
								<Button
									variant="danger"
									className="ad-btn"
									onClick={() =>
										handleBtnRemove(currentAd._id)
									}
								>
									Delete
								</Button>
							</div>
						) : (
							<></>
						)}
						<img
							className="ad-seller-image"
							alt="seller avatar"
							src={`${IMGS_URL}${sellerData.avatar}`}
						></img>
						<p>{sellerData.login}</p>
						<p>{sellerData.phoneNumber}</p>
					</div>
				</Col>

				{/* Ad Details */}
				<Col md={8} xs={12}>
					<div className="ad-detail-content">
						<h2 className="ad-detail-title">{currentAd.title}</h2>
						<p className="ad-detail-date">
							{`Posted: ${currentAd.publishedDate}`}
						</p>
						<img
							src={`${IMGS_URL}${currentAd.image}`}
							className="ad-detail-image img-fluid"
							alt="house ad"
						></img>
						<div className="ad-detail-info">
							<p className="ad-detail-location">
								<i className="fas fa-map-marker-alt"></i>{' '}
								{currentAd.location}
							</p>
							<p className="ad-detail-price">
								<i className="fas fa-dollar-sign"></i>
								{currentAd.price.toLocaleString()}
							</p>
							<div className="ad-description">
								<h4>About property:</h4>
								<p>{currentAd.content}</p>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
};
export default Ad;
