import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Searchbar = () => {
	const [search, setSearch] = useState('');

	const handleSearchSubmit = () => {};

	return (
		<Form className="d-flex mb-3 w-75 m-auto" onSubmit={handleSearchSubmit}>
			<Form.Control
				className="mx-2"
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
