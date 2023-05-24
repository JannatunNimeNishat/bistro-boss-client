
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';

import menuImg from '../../../assets/menu/menu-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import MenuCategory from '../MenuCategory/MenuCategory';

import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
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

            {/* 2nd  Desserts*/}
            <MenuCategory
                items={dessert}
                title='desserts'
                img={desertImg}
            ></MenuCategory>

            {/* 3rd Pizza */}
            <MenuCategory
                items={pizza}
                title='Pizza'
                img={pizzaImg}
            >
            </MenuCategory>

            {/* 4th Salads */}
            <MenuCategory
                items={salad}
                title='Salads'
                img={saladImg}
            ></MenuCategory>

            {/* 5th Soup */}
            <MenuCategory
                items={soup}
                title='Soups'
                img={soupImg}
            ></MenuCategory>

        </div>
    );
};

export default Menu;