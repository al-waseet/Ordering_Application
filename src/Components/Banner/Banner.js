import './Banner.css';

const Banner = ({Banner_Image, Color, Title}) => 
{
	const Gradient_Starting_Point = (Title.length * 20 / window.innerWidth) * 100;

	return <div className='Banner' key={Title.replace (' ', '_') + '_Banner_Key'} style={{backgroundImage: `linear-gradient(to right, rgba(${Color}, 1) ${Gradient_Starting_Point + '%'}, rgba(${Color}, 0.5) ${(Gradient_Starting_Point + 15) + '%'}, rgba(${Color}, 0) ${(Gradient_Starting_Point + 30) + '%'}), url(${Banner_Image})`}}><h1 className='Title' key={Title.replace (' ', '_') + '_Title_Key'}>{Title}</h1></div>;
}

export default Banner;