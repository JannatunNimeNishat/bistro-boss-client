
//captcha
import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const {signIn} = useContext(AuthContext);

    // captcha
    //to get the value of captcha field
    const captchaRef = useRef(null)

    const [disabled,setDisable] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        // console.log(value);
        if (validateCaptcha(user_captcha_value) == true) {
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

                            <input type="text" ref={captchaRef} name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button>


                        </div>
                        <div className="form-control mt-6">

                            <input disabled={disabled} className="btn btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                    <p><small>New Here? <Link to='/signup'>Create an account</Link></small></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;