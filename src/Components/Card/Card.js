import './Card.css';

const Card = ({Colors, children, Header, Image_URL, Subheader}) => (
	<div className='Card' style={{backgroundColor: Colors.Background, color: Colors.Text}}>
		<img className='Card_Image' src={Image_URL}></img>
		<div className='Card_Information'>
			<h1 className='Header'>{Header}</h1>
			<h2 className='Subheader'>{Subheader}</h2>
			<>{children}</>
		</div>
	</div>
)

export default Card;