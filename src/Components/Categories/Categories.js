import './Categories.css';
import { useRef } from 'react';

const Categories = ({Colors, Sections, Section_References}) => 
{
	const Navigation_Bar_Reference = useRef ();

	const Scroll_to_the_Section = Index =>
	{
		if (Navigation_Bar_Reference.current)
		{
			window.scrollTo ({top: Section_References.current [Index].offsetTop - Navigation_Bar_Reference.current.children [0].children [1].clientHeight, behavior: "smooth"})
		}
	}

	return <nav className='Categories' key='Menu_Categories_Key' ref={Navigation_Bar_Reference} style={{backgroundColor: Colors.Background, color: Colors.Text, top: Navigation_Bar_Reference.current ? (Navigation_Bar_Reference.current.children [0].children [1].clientHeight - Navigation_Bar_Reference.current.clientHeight).toString () + 'px' : '0px'}}>
		
			{Sections.map ((Category, Index) => 
			<div className="Category" key={Category.Name.replace (' ', '_') + '_Category_Key'} onClick={() => Scroll_to_the_Section (Index)}>
				<div><img alt={Category.Name + ' Image'} className='Category_Image' key={Category.Name.replace (' ', '_') + '_Category_Image_Key'} src={Category.Banner_Image}></img></div>
				<div className='Category_Name' key={Category.Name.replace (' ', '_') + '_Category_Name_Key'}>{Category.Name}</div>
			</div>)}
		
	</nav>;
}

export default Categories;