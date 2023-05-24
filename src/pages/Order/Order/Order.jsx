
import { useState } from 'react';
import orderCover from '../../../assets/shop/order.jpg'
import Cover from '../../Shared/Cover/Cover';
//react tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Cover
                title='Order Food'
                img={orderCover}
            ></Cover>

            {/* tabs */}
            <Tabs defaultIndex={0} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>

                </TabList>
                <TabPanel>
                    <OrderTab
                        items={salad}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={pizza}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;