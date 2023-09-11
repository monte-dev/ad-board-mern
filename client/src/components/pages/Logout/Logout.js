import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/userRedux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const logout = async () => {
			try {
				const options = {
					method: 'DELETE',
					credentials: 'include',
				};

				const response = await fetch(`${API_URL}/auth/logout`, options);

				if (response.status === 200) {
					console.log('Logout successful');
					localStorage.removeItem('user');
					dispatch(logOut());
					navigate('/');
				} else if (response.status === 401) {
					console.log('Not authorized');
				} else {
					console.log('Another issue');
				}
			} catch (error) {
				console.error('Logout error:', error);
			}
		};

		logout();
	}, [dispatch, navigate]);

	return null;
};

export default Logout;
