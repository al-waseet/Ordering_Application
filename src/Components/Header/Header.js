import Button from '../Button/Button';
import './Header.css';

const Header = ({Colors, Logo, Name, Website}) => 
{
	return (<header style={{backgroundColor: Colors.Background}}>
		<a className='Restaurant_Logo' href={Website} rel='noreferrer' target='_blank'><img alt={Name + ' Logo'} className='Restaurant_Logo_Image' src={Logo}></img></a>
		<select className='Languages' style={{borderBottom: `1px solid ${Colors.Text}`, color: Colors.Text}}>
			<option value="English">English</option>
			<option value="Arabic">عربي</option>
		</select>
		<Button Button_Color={Colors.Button} Height={30} Text="Waiter" Text_Color={Colors.Button_Text} Width={90}></Button>
	</header>);
}

export default Header;