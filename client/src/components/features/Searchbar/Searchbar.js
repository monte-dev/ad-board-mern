import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const handleSearchSubmit = async (e) => {
		e.preventDefault();
		navigate(`/search/${search}`);
		setSearch('');
	};

	return (
		<Form className="d-flex mb-3 w-50 m-auto" onSubmit={handleSearchSubmit}>
			<Form.Control
				className="mx-3"
				type="search"
				placeholder="Search ads..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button variant="outline-primary" type="submit">
				Search
			</Button>
		</Form>
	);
};
export default Searchbar;
