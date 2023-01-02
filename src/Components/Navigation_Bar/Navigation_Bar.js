import { ReactComponent as Back_Icon } from '../../Images/Back_Icon.svg'
import { Link } from 'react-router-dom';
import './Navigation_Bar.css';

const Navigation_Bar = ({Colors, Page_Title, Previous_Page_URL}) => (
	<nav className='Navigation_Bar' style={{backgroundColor: Colors.Background, color: Colors.Text}}>
		<Link className='Link_to_the_Menu' to={Previous_Page_URL}>
            <Back_Icon className='Back_Icon' height='1.2rem' fill={Colors.Text}></Back_Icon>
            <h2>Menu</h2>
        </Link>
		<h2 className='Page_Title'>{Page_Title}</h2>
		{<div style={{visibility: 'hidden'}}>1</div> /* This is a hack to keep the page title in the center */}
	</nav>
);

export default Navigation_Bar;