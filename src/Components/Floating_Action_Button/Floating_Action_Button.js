import { CartStateContext } from '../../Providers/Cart';
import './Floating_Action_Button.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const Floating_Action_Button = ({Colors, Icon}) =>
{
	const Cart = useContext (CartStateContext);
	const Location = useLocation ();
	const Number_of_Items = Cart.items.map (Cart_Item => Cart_Item.Quantity).reduce ((Previous_Value, Current_Value) => Previous_Value + Current_Value, 0);
	
	return (<div className='Floating_Action_Button_Container'>
				{Cart.items.length > 0 ? <div className='Cart_Items' key={Number_of_Items}>{Number_of_Items}</div> : null}
				<Link className='Floating_Action_Button' style={{backgroundColor: Colors.Button, color: Colors.Button_Text}} to={Location.pathname + '/cart'}>
					<img alt='This is a Cart button, located near the bottom right corner of the screen.' className='Floating_Action_Button_Image' src={Icon}></img>
				</Link>
			</div>);
}

export default Floating_Action_Button;