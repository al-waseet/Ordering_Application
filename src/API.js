import { Configuration } from "./Configuration";

const API = 
{
	Get_the_Restaurant: async (Restaurant_ID) =>
	{
		const Restaurant = await (await fetch (Configuration.API_URL + '/restaurant/' + Restaurant_ID)).json ();
		Restaurant.Data.Categories.forEach (Category => Category.Banner_Image = Configuration.COS_URL + Category.Banner_Image);
        Restaurant.Data.Cart_Icon = Configuration.COS_URL + Restaurant.Data.Cart_Icon;
		Object.keys (Restaurant.Data.Icons).forEach (Key => Restaurant.Data.Icons [Key] = Configuration.COS_URL + Restaurant.Data.Icons [Key]); 
		Restaurant.Data.Menu.forEach (Menu_Item => Menu_Item.Image = Configuration.COS_URL + Menu_Item.Image); 
		Restaurant.Data.Logo = Configuration.COS_URL + Restaurant.Data.Logo;
		return Restaurant;
	},

	Send_the_Order: async (Order) => 
	{
		return await (await fetch (Configuration.API_URL + '/order', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify (Order)}));
	}
};

export default API;