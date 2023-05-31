import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import { useForm } from 'react-hook-form';

const AddItem = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)

    };

    console.log(errors);



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
                        <select className="select select-bordered"
                            {...register("category", { required: true })}
                        >
                            <option disabled selected>Pick one</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
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