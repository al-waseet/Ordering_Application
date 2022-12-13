import './Button.css';

const Button = ({Button_Color, Function, Text, Text_Color}) => <button className='Generic_Button' onClick={Function} style={{backgroundColor: Button_Color, color: Text_Color}}>{Text}</button>;

export default Button;