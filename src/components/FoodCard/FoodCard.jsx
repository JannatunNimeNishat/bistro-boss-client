import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../MyButton/MyButton";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item}) => {
    const { _id, name, image, price, recipe } = item;
    const { user } = useContext(AuthContext);
    //refetch from useCart and tenStack
    const [ , refetch] = useCart()


    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);



    
    //add the food to the cart and save it to database along with user email 
    const handleAddToCart = (item) => {

        const cartItem = {menuItemId: _id,name,image,price,email: user?.email}
        if (user && user.email) {
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        //refetching the cart using useCart and tenStack
                          refetch(); //refetch cart to update the number of items in the cart

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cert',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from:location}})
                }
            })
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white px-4 rounded-lg absolute right-5 top-3">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>

                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} >
                        <MyButton btnText='Add to cart'></MyButton>
                    </button>
                </div>
                {/* <div className="card-actions justify-center">
                    <button className="btn btn-primary">Add to cart</button>
                </div> */}
            </div>
        </div>
    );
};

export default FoodCard;