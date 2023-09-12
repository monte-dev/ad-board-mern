import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Register from './components/pages/Register/Register';
import Search from './components/pages/Search/Search';
import './styles/App.css';

const App = () => {
	return (
		<main>
			<Header />
			<Container className="wrapper">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/ad/:id" element={<Ad />}></Route>
					<Route path="/ad/add" element={<AdAdd />}></Route>
					<Route path="/ad/edit/:id" element={<AdEdit />}></Route>
					<Route
						path="/search/:searchPhrase"
						element={<Search />}
					></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</Container>
			<Footer />
		</main>
	);
};
export default App;
