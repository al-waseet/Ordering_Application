import { Add_to_Cart, CartDispatchContext, Clear_Cart, Remove_from_Cart } from '../../Providers/Cart';
import API from '../../API';
import Button from '../../Components/Button/Button';
import './Cart.css';
import Card from '../../Components/Card/Card';
import { CartStateContext } from '../../Providers/Cart';
import Header from '../../Components/Header/Header'
import Navigation_Bar from '../../Components/Navigation_Bar/Navigation_Bar';
import Spinner from '../../Components/Spinner/Spinner';
import Quantity_Controller from '../../Components/Quantity_Controller/Quantity_Controller';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurantFetch } from '../../Hooks/useRestaurantFetch';
import { useTitle } from '../../Hooks/useTitle';


const Cart = () =>
{
	const Cart_Context = useContext (CartStateContext);
	const restaurant = useRestaurantFetch ();
	const Dispatch = useContext (CartDispatchContext);
	const { Restaurant_ID, Table_ID } = useParams ();

	useTitle (restaurant.Name + ' Cart');

	useEffect (() =>
	{
		if (Object.keys (restaurant).length !== 0)
		{
			document.querySelector("link[rel~='icon']").href = restaurant.Icons.Favicon;
			document.querySelector("link[rel~='apple-touch-icon']").href = restaurant.Icons.One_Hundred_Ninety_Two_Pixels;
		}
	}, [restaurant]);

	if (Object.keys (restaurant).length === 0)
	{
		return <div className='Loading_Page'><Spinner></Spinner></div>
	}

	const Decrease_Item_Count_by_One = (Cart_Item) =>
	{
		Remove_from_Cart (Dispatch, Cart_Item);
	}

	const Increase_Item_Count_by_One = (Cart_Item) =>
	{
		Add_to_Cart (Dispatch, Cart_Item);
	}

	const Send_the_Order = () =>
	{
		API.Send_the_Order ({Items: Cart_Context.items, Table_Number: Table_ID, Timestamp: new Date ().toLocaleString ()});
		Clear_Cart (Dispatch);
	}

	return (
		<>
			<Header Colors={restaurant.Colors} Logo={restaurant.Logo} Name={restaurant.Name} Website={restaurant.Website}></Header>
			<Navigation_Bar Colors={restaurant.Colors} Page_Title="Cart" Previous_Page_URL={'/' + Restaurant_ID + '/' + Table_ID}></Navigation_Bar>
			<div className='Order' style={{backgroundColor: restaurant.Colors.Background, color: restaurant.Colors.Text}}>
				{
					Cart_Context.items.map (Cart_Item =>
					{
						return (
							<div className='Cart_Item' style={{borderBottom: `1px solid ${restaurant.Colors.Text}`}}>
								<Card Colors={restaurant.Colors} Header={Cart_Item.Name} Image_URL={Cart_Item.Image_URL} Subheader={"AED " + Cart_Item.price}>
									{
										Cart_Item.addonsQuantities !== undefined ? 
										<div className='Cart_Item_Ingredients'>
											{Cart_Item.addonsQuantities.map (Addon => <p>{Addon.Name}: {Addon.Quantity}</p>)}
										</div> : null
									}
									{
										Cart_Item.notes !== undefined ? 
										<div className='Cart_Item_Notes'>
											{<p>Notes: {Cart_Item.notes}</p>}
										</div> : null
									}
								</Card>
								<div className='Cart_Item_Quantities'>
									<Quantity_Controller Color={restaurant.Colors.Button} Decrementing_Function={() => Decrease_Item_Count_by_One (Cart_Item)} Incrementing_Function={() => Increase_Item_Count_by_One (Cart_Item)} Quantity={Cart_Item.Quantity}></Quantity_Controller>
								</div>
							</div>
						)
					})
				}
			</div>
			<h2 className='Total_Price' style={{backgroundColor: restaurant.Colors.Background, color: restaurant.Colors.Text}}>Total Price: AED {Cart_Context.items.map (Cart_Item => Cart_Item.price * Cart_Item.Quantity).reduce ((Previous_Price, Current_Price) => Previous_Price + Current_Price, 0)}</h2>
			<div className='Ordering_Button_Container' style={{backgroundColor: restaurant.Colors.Background, color: restaurant.Colors.Text}}>
				<Button Button_Color={restaurant.Colors.Button} Function={Send_the_Order} Height={60} Text="Place Order" Text_Color={restaurant.Colors.Button_Text} Width={160}></Button>
			</div>
		</>
	)
}

export default Cart;