import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

//getting the api (imagebb)
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;


const AddItem = () => {

    const [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

// form data
    const onSubmit = data => {

        //getting the local image
        const formData = new FormData();
        formData.append('image', data.image[0])

        //sending the local image to imgbb with api key
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData //with out stringify
        })
            .then(res => res.json())
            .then(imgResponse => {
                //getting the imgbb uploaded img display_url
                const imgURL = imgResponse.data.display_url
                // destructuring the form data
                const { name, price, category, recipe } = data;
                //replacing the local image with imagebb uploaded imageURL 
                //and make a new object with form data
                //parseFloat price to avoid string problem
                const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }
             
                // sending data with axiosSecure with access-token from local host
                axiosSecure.post('/menu', newItem)
                .then(data =>{
                    console.log('after posting new item', data.data);
                    if(data.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })


            })

    };





    return (
        <div className="w-full px-10">
            <SectionTitle subHeading="What's new" heading="Add an Item"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" className="input input-bordered w-full "
                        {...register("name", { required: true, maxLength: 80 })}
                    />

                </div>

                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="Pick one" className="select select-bordered"
                            {...register("category", { required: true })}
                        >
                            <option disabled >Pick one</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Desi</option>
                            <option>Drinks</option>


                        </select>

                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" placeholder="Type here" className="input input-bordered w-full "
                            {...register("price", { required: true })}
                        />

                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details</span>

                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
                        {...register("recipe", { required: true })}
                    ></textarea>

                </div>
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Item Image*</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full "
                        {...register("image", { required: true })}
                    />

                </div>
                <input type="submit" className="btn btn-sm my-4" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;