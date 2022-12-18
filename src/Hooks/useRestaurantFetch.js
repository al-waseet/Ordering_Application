import API from '../API';
import { Configuration } from '../Configuration';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export const useRestaurantFetch = () =>
{
	const [restaurant, setRestaurant] = useState ({});
	const { Restaurant_ID } = useParams ();

	const Get_the_Restaurant = async () =>
	{
		if (Restaurant_ID === undefined)
		{
			const Restaurant_Preview_Channel = new BroadcastChannel ('Restaurant_Preview');
			Restaurant_Preview_Channel.addEventListener ('message', Event =>
			{
				console.log (Event)
				setRestaurant (JSON.parse (Event.data))
			});
		}
		else
		{
			const Restaurant = await API.Get_the_Restaurant (Restaurant_ID);
			setRestaurant (Restaurant.Data);
		}
	}

	useEffect (() =>
	{
		Get_the_Restaurant ();
	}, []);

	return restaurant;
}