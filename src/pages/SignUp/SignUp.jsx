import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    //react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    //getting the data
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                //update user display name and photoUrl
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user created successfully');
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        navigate('/')

                    })
                    .catch(error => console.log(error))


            })
            .catch(error => console.log(error))
    };

    // console.log(watch("example")); // watch input value by passing the name of it


    return (

        <>
            <Helmet>
                <title>Bistro | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {/* form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered "
                                    {...register("name", { required: true })}
                                />
                                {/* errors will return when field validation fails  */}
                                {errors.name && <span className="text-red-500 mt-1">This name is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500 mt-1">This email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input type="password" name="password" placeholder="password" className="input input-bordered"
                                    {...register("password",
                                        {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })}
                                />

                                {/* validation */}
                                {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-500">Password must be not grater then 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one upper case one number one special character</p>}

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">photoURL</span>
                                    </label>
                                    <input type="text" name="photoURL" placeholder="photoURL" className="input input-bordered"
                                        {...register("photoURL", { required: true })}
                                    />
                                    {errors.photoURL && <span className="text-red-500 mt-1">This photoURL is required</span>}
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value='Sign Up' className="btn btn-primary" />
                            </div>
                        </form>
                        <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;