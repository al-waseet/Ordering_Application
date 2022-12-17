import Button from '../Button/Button';
import './Header.css';

const Header = ({Colors, Language, Logo, Name, Set_Language, Website}) => 
{
	return (<header style={{backgroundColor: Colors.Background}}>
		<a className='Restaurant_Logo' href={Website} rel='noreferrer' target='_blank'><img alt={Name + ' Logo'} className='Restaurant_Logo_Image' src={Logo}></img></a>
		<div className='Standalone_Section'>
			<div className='Language_Selectors'>
				<span className={'Language_Selector' + (Language === 'en-US' ? ' Active_Language' : '')} onClick={() => Set_Language ('en-US')} style={{color: Language === 'en-US' ? Colors.Button : Colors.Text}}>English</span> | <span className={'Language_Selector' + (Language === 'ru' ? ' Active_Language' : '')} onClick={() => Set_Language ('ru')} style={{color: Language === 'ru' ? Colors.Button : Colors.Text}}>عربي</span>
			</div>
			<Button Button_Color={Colors.Button} Height={30} Text="Waiter" Text_Color={Colors.Button_Text} Width={90}></Button>
		</div>
	</header>);
}

export default Header;