
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';

import menuImg from '../../../assets/menu/menu-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');


    return (
        <div>
            <Helmet>
                <title>Menu</title>
            </Helmet>
            <Cover img={menuImg}
                title='Our menu'
            ></Cover>

            {/* 1st Today's offer */}
            <SectionTitle
                subHeading="Don't miss"
                heading="TODAY'S OFFER"
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>


        </div>
    );
};

export default Menu;