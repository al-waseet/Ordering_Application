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
			const Socket = new WebSocket ('ws://localhost:3031');

			Socket.addEventListener ('open', (Event) => 
            {
                console.log(1);
            });

            Socket.addEventListener ('message', (Event) => 
            {
                console.log('Message from server ', Event.data);
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