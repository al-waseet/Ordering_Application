import Button from '../Button/Button';
import { CartDispatchContext, Add_to_Cart } from '../../Providers/Cart';
import Checkbox from '../Checkbox/Checkbox';
import './Customization.css';
import React, { useContext, useEffect, useState } from 'react';
import Text_Input_Field from '../Text_Input_Field/Text_Input_Field'
import Quantity_Controller from '../Quantity_Controller/Quantity_Controller';

const Customization = ({Addons, Colors, ID, Image_URL, Name, Price}) => 
{
	const Dispatch = useContext (CartDispatchContext);
    const [addonsQuantities, setAddonsQuantities] = useState ([]);
	const [notes, setNotes] = useState ('');
	const [price, setPrice] = useState (0);

    const Set_the_Initial_State = () =>
    {
        setAddonsQuantities (Addons.map (Addon => Object.assign (Addon, {Quantity: 0})));
		setPrice (Price);
        setNotes ('');
    }

    useEffect (() =>
	{
		Set_the_Initial_State ();
	}, []);

	const Add_Customized_Item_to_the_Cart = () =>
	{
		Add_to_Cart (Dispatch, {addonsQuantities: addonsQuantities.map (Addon => ({...Addon})), ID, Image_URL, Name, notes, price, Quantity: 1});
        Set_the_Initial_State ();
	}

    const Decrease_Ingredient_Quantity_by_One = (Addon) =>
	{
		if (Addon.Quantity > 0)
		{
            const Addon_Quantities_Copy = [...addonsQuantities];
            const Index = Addon_Quantities_Copy.findIndex (Item => Item.ID === Addon.ID);
            Addon_Quantities_Copy [Index].Quantity = Addon_Quantities_Copy [Index].Quantity - 1;
			setAddonsQuantities (Addon_Quantities_Copy);
			setPrice (price + Addon_Quantities_Copy [Index].Price * Addon_Quantities_Copy [Index].Quantity);
		}
	}

	const Increase_Ingredient_Quantity_by_One = (Addon) =>
	{
        const Addon_Quantities_Copy = [...addonsQuantities];
        const Index = Addon_Quantities_Copy.findIndex (Item => Item.ID === Addon.ID);
		Addon_Quantities_Copy [Index].Quantity = Addon_Quantities_Copy [Index].Quantity + 1;
		setAddonsQuantities (Addon_Quantities_Copy);
		setPrice (price + Addon_Quantities_Copy [Index].Price * Addon_Quantities_Copy [Index].Quantity);
	}

    return (
        <div className='Customization_Section'>
            {addonsQuantities.filter (Addon => !Addon.Countable).length > 0 ? <div className='Uncountable_Addons'>
                <h2>Add-ons</h2>
                <div className='Selectors'>
                    {addonsQuantities.filter (Addon => !Addon.Countable).map (Addon => (<Checkbox Checked_Status={Addon.Quantity === 0 ? false : true} Color={Colors.Button} Function={Addon.Quantity === 0 ? () => (Increase_Ingredient_Quantity_by_One (Addon)) : () => (Decrease_Ingredient_Quantity_by_One (Addon))} Label={Addon.Name + ` (+ AED ${Addon.Price})`}></Checkbox>))}
                </div>
            </div> : null}
            {addonsQuantities.filter (Addon => Addon.Countable).length > 0 ? <div className='Countable_Addons'>
                <h2>Side Dishes</h2>
                {
                    addonsQuantities.filter (Addon => Addon.Countable).map (Addon => (
                        <div className='Ingredient_Container'>
                            <h3 className='Ingredient_Name'>{Addon.Name} (+ AED {Addon.Price})</h3>
                            <Quantity_Controller Color={Colors.Button} Decrementing_Function={() => (Decrease_Ingredient_Quantity_by_One (Addon))} Incrementing_Function={() => (Increase_Ingredient_Quantity_by_One (Addon))} Quantity={Addon.Quantity}></Quantity_Controller>
                        </div>
                    ))
                }
            </div> : null}
            <div className='Notes_Container'>
                <Text_Input_Field Color={Colors.Text} Function={setNotes} Label='Notes' Type='text' Value={notes}></Text_Input_Field>
            </div>
            <div className='Customization_Button_Container'>
                <Button Button_Color={Colors.Button} Function={Add_Customized_Item_to_the_Cart} Height={30} Text="Add to Cart" Text_Color={Colors.Button_Text} Width={120}></Button>
            </div>
        </div>
    );
}

export default Customization;