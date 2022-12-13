import Quantity_Button from '../Quantity_Button/Quantity_Button'
import './Quantity_Controller.css';

const Quantity_Controller = ({Color, Decrementing_Function, Incrementing_Function, Quantity}) => (
	<div className='Quantity_Controller'>
		<Quantity_Button Color={Color} Function={Decrementing_Function}></Quantity_Button>
		<h3 className='Quantity'>{Quantity}</h3>
		<Quantity_Button Color={Color} Function={Incrementing_Function} Positive={true}></Quantity_Button>
	</div>
)

export default Quantity_Controller;