import { Link } from "react-router-dom";
import MyButton from "../../../components/MyButton/MyButton";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {/* if title available then show this cover component */}
            {title && <Cover img={img}
                title={title}
            ></Cover>}

            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`} className="flex justify-center -mt-8 mb-8">
                <MyButton btnText='Order now'></MyButton>
            </Link>
        </div>
    );
};

export default MenuCategory;