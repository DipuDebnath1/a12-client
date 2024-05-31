import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [submitBtn, setSubmitBtn] = useState(false)
    const {login} = useContext(AuthContext);

    // collect user data
    const handleChange = (e) =>{
        const {name,value} = e.target
        setUserData({...userData,[name]:value})
    }

    // handle login button 
    useEffect(()=>{
        if (userData.email && userData.password) {
            setSubmitBtn(true)
        }
        else setSubmitBtn(false)
    }, [userData])

// submit from 
    const handleFrom = (e) =>{
        e.preventDefault()
        login(userData.email, userData.password)
        .then(res=>{
            if (res.user) {
                navigate('/')
            }
        })
        .catch(err=>err.message)

    }

    return (
        <div className='px-2 flex justify-center items-center min-h-[100vh]'>
           <div className='md:w-6/12 lg:w-5/12 bg-blue-50 p-10 my-5 rounded'>
           <form className="flex flex-col gap-4 mx-auto" onSubmit={handleFrom}>
            <h2 className='text-center text-2xl font-semibold '>Sign Up Here</h2>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput onChange={handleChange} id="email" name="email" type="email"  placeholder="enter your email..." required shadow />
                </div>
                
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput onChange={handleChange} id="password" name="password" type="password" placeholder="enter password here..." required shadow />
                </div>
             
                <div>
                    <p>have not a account please <Link to={'/register'}> <strong  className='text-cyan-600'>Register</strong></Link></p>
                </div>
                {
                    submitBtn ?  <Button type="submit">Sign Up</Button> :
                    <Button disabled type="submit">Sign Up</Button>
                }
               
            </form>
           </div>
        </div>
    );
};

export default SignIn;