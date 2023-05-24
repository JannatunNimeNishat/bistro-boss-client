

const FoodCard = ({item}) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white px-4 rounded-lg absolute right-5 top-3">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;