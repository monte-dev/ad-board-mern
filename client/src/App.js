import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';
import AdRemove from './components/pages/AdRemove/AdRemove';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import NotFound from './components/pages/NotFound/NotFound';
import Register from './components/pages/Register/Register';
import Search from './components/pages/Search/Search';

const App = () => {
	return (
		<main>
			<Container>
				<Header />
			</Container>
		</main>
	);
};
export default App;
