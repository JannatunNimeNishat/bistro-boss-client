
//captcha
import { useContext, useEffect, useState } from 'react';
// import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    // console.log(from);
    // captcha
    //to get the value of captcha field
    // const captchaRef = useRef(null)

    const [disabled,setDisable] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        // const user_captcha_value = captchaRef.current.value;
        // console.log(value);
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }

    }

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value;
        console.log(email, password);
        signIn(email,password)
        .then(result =>{
            console.log(result.user);
            Swal.fire({
                title: 'User Login Successful',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              });
              navigate(from, {replace:true})
        })
        .catch(error=>{
            console.log(error.message);
        })
    }

    return (
        <>
        <Helmet>
            <title>Bistro | Login</title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center  lg:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full lg:w-1/2  max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>


                        {/* captcha */}
                        <div className="form-control">

                            <label className="label">
                                < LoadCanvasTemplate />
                            </label>

                            <input type="text" onBlur={handleValidateCaptcha}   name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            {/* <input type="text"  ref={captchaRef} name="captcha" placeholder="type the captcha above" className="input input-bordered" /> */}

                            {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button> */}

                            {/* <button  className="btn btn-outline btn-xs mt-2">Validate</button> */}


                        </div>
                        
                        {/* TODO: make button disabled for captcha */}
                        <div className="form-control mt-6">

                            <input disabled={false} className="btn btn-primary" type="submit" value="login" />
                            {/* <input disabled={disabled} className="btn btn-primary" type="submit" value="login" /> */}
                        </div>

                    </form>
                    <p><small>New Here? <Link to='/signup'>Create an account</Link></small></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;