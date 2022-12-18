import {ReactComponent as Arrow_Down} from '../../Images/Arrow_Down.svg';
import Banner from '../../Components/Banner/Banner';
import Card from '../../Components/Card/Card';
import { CartStateContext } from '../../Providers/Cart';
import Categories from '../../Components/Categories/Categories';
import {Convert_HEX_to_RGB} from '../../Helpers';
import Customization from '../../Components/Customization/Customization'
import Floating_Action_Button from '../../Components/Floating_Action_Button/Floating_Action_Button';
import Header from '../../Components/Header/Header';
import './Menu.css';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useRestaurantFetch } from '../../Hooks/useRestaurantFetch';
import { useTitle } from '../../Hooks/useTitle';

const Menu = () =>
{
	const Cart_Context = useContext (CartStateContext);
	const [displayStatuses, setDisplayStatuses] = useState ({});
	const [Language, Set_Language] = useState ('en-US');
	const Section_References = useRef ([]);
	const Restaurant_and_Menu = useRestaurantFetch ();
	
	useTitle (Restaurant_and_Menu.Name + ' Menu');

	const Toggle_the_Customization_Menu = (ID) =>
	{
		const Customization_Menu_New_Display_Statuses = Object.assign ({}, displayStatuses);
		Customization_Menu_New_Display_Statuses [ID] = !Customization_Menu_New_Display_Statuses [ID];
		setDisplayStatuses (Customization_Menu_New_Display_Statuses);
	}

	useEffect (() =>
	{
		if (Object.keys (Restaurant_and_Menu).length !== 0)
		{
			document.querySelector("link[rel~='icon']").href = Restaurant_and_Menu.Icons.Favicon;
			document.querySelector("link[rel~='apple-touch-icon']").href = Restaurant_and_Menu.Icons.One_Hundred_Ninety_Two_Pixels;
			setDisplayStatuses (Restaurant_and_Menu.Menu.map (Menu_Item => Menu_Item.ID).reduce ((Menu_Item_ID, Index) => (Menu_Item_ID [Index] = false, Menu_Item_ID), {}));
		}
	}, [Restaurant_and_Menu]);

	if (Object.keys (Restaurant_and_Menu).length === 0/* || Section_References.current.length === 0*/)
	{
		return <div>Loading...</div>
	}

	return (
		<>
			<Header Colors={Restaurant_and_Menu.Colors} Language={Language} Logo={Restaurant_and_Menu.Logo} Name={Restaurant_and_Menu.Name} Set_Language={Set_Language} Website={Restaurant_and_Menu.Website}></Header>
			<Categories Colors={Restaurant_and_Menu.Colors} Sections={Restaurant_and_Menu.Categories} Section_References={Section_References}></Categories>
			<div className='Menu' key='Menu_Key' style={{backgroundColor: Restaurant_and_Menu.Colors.Background, color: Restaurant_and_Menu.Colors.Text}}>
				{
					Restaurant_and_Menu.Categories.map ((Section, Index) =>
					{
						return (
							<div className='Section' key={Section.Name.replace (' ', '_') + '_Section_Key'} ref={Section_Reference => Section_References.current [Index] = Section_Reference}>
								<Banner Banner_Image={Section.Banner_Image} Color={Convert_HEX_to_RGB (Restaurant_and_Menu.Colors.Background)} Title={Section.Name}></Banner>
								{
									Restaurant_and_Menu.Menu.filter (Menu_Item => Menu_Item.Category === Section.Name).map (Menu_Item => 
									{
										return (
											<div className='Menu_Item' style={{borderBottom: `1px solid ${Restaurant_and_Menu.Colors.Text}`}}>
												<div className='Card_Container' onClick={() => Toggle_the_Customization_Menu (Menu_Item.ID)}>
													<Card Colors={Restaurant_and_Menu.Colors} Header={Cart_Context.items.filter (Cart_Item => Cart_Item.ID === Menu_Item.ID).length === 0 ? Menu_Item.Name : (Cart_Context.items.filter (Cart_Item => Cart_Item.ID === Menu_Item.ID) [0].Quantity + " x " + Menu_Item.Name)} Image_URL={Menu_Item.Image} Subheader={"AED " + Menu_Item.Price}>
														<p className='Menu_Item_Description'>{Menu_Item.Description}</p>
													</Card>
													<Arrow_Down className={displayStatuses [Menu_Item.ID] ? 'Close_Customization_Button Open_Customization_Animation': 'Open_Customization_Button Close_Customization_Animation'} fill={Restaurant_and_Menu.Colors.Text} />
												</div>
												{displayStatuses [Menu_Item.ID] ? <Customization Addons={Menu_Item.Addons} Colors={Restaurant_and_Menu.Colors} ID={Menu_Item.ID} Image_URL={Menu_Item.Image} Name={Menu_Item.Name} Price={Menu_Item.Price}></Customization> : null}
											</div>
										);
									})
								}
							</div>
						);
					})
				}
			</div>
			<Floating_Action_Button Colors={Restaurant_and_Menu.Colors} Icon={Restaurant_and_Menu.Cart_Icon}></Floating_Action_Button>
		</>
	);
}

export default Menu;