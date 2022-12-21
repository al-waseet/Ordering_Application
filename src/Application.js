import './Application.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart/Cart';
import Cart_Provider from './Providers/Cart';
import Menu from './Pages/Menu/Menu';
import Not_Found from './Pages/Not_Found/Not_Found';

const Application = () => (
	<Router basename='/menu' key='Router_Key'>
		<Cart_Provider key='Cart_Provider_Key'>
			<Routes key='Routes_Key'>
				<Route key='Menu_Route_Key' path='/preview' element={<Menu />} />
				<Route key='Menu_Route_Key' path='/:Restaurant_ID/:Table_ID' element={<Menu />} />
				<Route key='Cart_Route_Key' path='/:Restaurant_ID/:Table_ID/cart' element={<Cart />} />
				<Route key='Miscellaneous_Route_Key' path='/*' element={<Not_Found />} />
			</Routes>
		</Cart_Provider>
	</Router>
);

export default Application;