

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item
    return (
        <div className="flex space-x-2">
            <img className="w-[100px] " src={image} alt="" style={{borderRadius: "0 200px 200px 200px"}}/>
            <div>
                <h3>{name}-------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;