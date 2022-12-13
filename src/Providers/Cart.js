import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export const CartStateContext = createContext ();
export const CartDispatchContext = createContext ();

const reducer = (state, action) => 
{
	switch (action.type) 
	{
		case "ADD_TO_CART":
			let cartItems = null;
			if (state.items.map (Item => JSON.stringify ({addonsQuantities: Item.addonsQuantities, ID: Item.ID})).includes (JSON.stringify ({addonsQuantities: action.payload.cartItem.addonsQuantities, ID: action.payload.cartItem.ID})))
			{
				const items = state.items.map ((item) =>
				{
					if (JSON.stringify ({addonsQuantities: item.addonsQuantities, ID: item.ID}) === JSON.stringify ({addonsQuantities: action.payload.cartItem.addonsQuantities, ID: action.payload.cartItem.ID}))
					{
						return {...item, Quantity: item.Quantity + 1};
					}
					return item;
				});
				cartItems = [...items];
			} 
			else
			{
				cartItems = [...state.items, action.payload.cartItem];
			}
			return {...state, items: cartItems};
		case "REMOVE_FROM_CART":
			if (action.payload.cartItem.Quantity > 1)
			{
				let Cart_Items = null;
				const items = state.items.map ((item) =>
				{
					if (JSON.stringify ({addonsQuantities: item.addonsQuantities, ID: item.ID}) === JSON.stringify ({addonsQuantities: action.payload.cartItem.addonsQuantities, ID: action.payload.cartItem.ID}))
					{
						return {...item, Quantity: item.Quantity - 1};
					}
					return item;
				});
				Cart_Items = [...items];
				return {...state, items: Cart_Items};
			}
			else
			{
				return {...state, items: state.items.filter ((item) => JSON.stringify ({addonsQuantities: item.addonsQuantities, ID: item.ID}) !== JSON.stringify ({addonsQuantities: action.payload.cartItem.addonsQuantities, ID: action.payload.cartItem.ID}))};
			}
		case "CLEAR_CART":
			return {...state, ...{items: []}};
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

export const Add_to_Cart = (dispatch, cartItem) => 
{
	return dispatch ({type: "ADD_TO_CART", payload: {cartItem: cartItem}});
};

export const Remove_from_Cart = (dispatch, cartItem) => 
{
	return dispatch ({type: "REMOVE_FROM_CART", payload: {cartItem: cartItem}});
};

export const Clear_Cart = (dispatch) => 
{
	return dispatch ({type: "CLEAR_CART"});
};

const Cart_Provider = ({ children }) => 
{
	const [persistedCartItems, setPersistedCartItems] = useLocalStorage ("cartItems", []);
	const persistedCartState = 
	{
		items: persistedCartItems || []
	};
	const [state, dispatch] = useReducer (reducer, persistedCartState);
	useEffect (() => 
	{
		setPersistedCartItems (state.items);
	}, [state.items, setPersistedCartItems]);
	return (
		<CartDispatchContext.Provider key='Card_Dispatch_Key' value={dispatch}>
			<CartStateContext.Provider key='Card_State_Key' value={state}>
				{children}
			</CartStateContext.Provider>
		</CartDispatchContext.Provider>
	);
};

export default Cart_Provider;