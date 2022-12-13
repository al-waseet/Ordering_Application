import { Link } from 'react-router-dom';
import './Navigation_Bar.css';

const Navigation_Bar = ({Colors, Page_Title, Previous_Page_URL}) => (
	<nav className='Navigation_Bar' style={{backgroundColor: Colors.Background, color: Colors.Text}}>
		<Link className='Link_to_the_Menu' to={Previous_Page_URL}>← Back</Link>
		<h1 className='Page_Title'>{Page_Title}</h1>
		<div></div>
	</nav>
);

export default Navigation_Bar;