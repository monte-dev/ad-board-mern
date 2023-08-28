import Navbar from '../Navbar/Navbar';
import styles from './Header.module.css';
const Header = () => {
	return (
		<div className={styles.header}>
			<Navbar />
			<img
				src={`${process.env.PUBLIC_URL}/images/header-overlay.jpg`}
				alt="header "
			></img>
		</div>
	);
};
export default Header;
