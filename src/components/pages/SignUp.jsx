import { Button, Checkbox, FileInput, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { FaEye } from "react-icons/fa";

//img bb api link
// b08a05166a05548cb7fd6c6d2e3dd6e6

// const imageApi = 'b08a05166a05548cb7fd6c6d2e3dd6e6' 
// https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY
// const imageHoistingApi = `https://api.imgbb.com/1/upload?key=b08a05166a05548cb7fd6c6d2e3dd6e6`

const SignUp = () => {
    
    const { register, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()
    const [submitBtn, setSubmitBtn] = useState(false)
    const [passwords, setPasswords] = useState({})
    const [fromData, setFromData] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)

 
    // handle login button 
    const handleActiveBtn = (e)=>{
        setSubmitBtn(e.target.checked);
    }

    // collect user data
    const handleChange = (e) =>{
        let {name,value} =e.target
        setFromData({...fromData,[name]:value})

        if (name==='password' || name==='confirmPassword' ) {
            setPasswords({...passwords, [name]:value})
        }
    }
    
// submit from 
    const handleFrom = (e) =>{
        e.preventDefault()

        const verify = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/


         if (passwords.password != passwords.confirmPassword) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "password & confirm Password Not match!",
                footer:'please retype password'
              });
        }

        if (!verify.test(fromData.password)) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `your password is weak !
                        password length must have 6. Using
                        "number, letter (capital & small) &
                        spacial carecter"
                `,
                footer:'please enter strong password'
            })
        }
      
        register(fromData.email, fromData.password)
        .then(async(res)=>{
             updateUserProfile(fromData.name, fromData.authorImg)
            .then(()=>{
                // console.log('profile update success');
                const userData =  {name:res.user.displayName, email:res.user.email, role:'user', img:res.user.photoURL, salary:1000, bank_Account:1234567890, pay:false, verified:false}
                console.log(userData)
                 axios.post(`${import.meta.env.VITE_SERVER_API}/users`,userData)
                 .then(response=>console.log(response.data))
                //  .then(response=>console.log(response))
                //  .catch(error=>console.log(error))
                 
                navigate('/')
            })
            .catch(()=>console.log('profile update failed'))
        
                
        })
        .catch(err=>console.log(err.message))


    
    }
 
    const fileUpload = async (e) => {
        const imageHostingApi = import.meta.env.VITE_IMAGEBB_API

        const image = e.target.files[0];
 
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post(imageHostingApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                setFromData({...fromData,['authorImg']:res.data.data.display_url})
            }
         } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleShowPassword = (value) =>{
        value==='password' ? setShowPassword(!showPassword) :''
        value==='rePassword' ? setShowRePassword(!showRePassword) :''
    }

    return (
        <div className='px-2 flex justify-center items-center min-h-[100vh]'>
           <div className='md:w-8/12 lg:w-6/12 bg-blue-50 p-10 my-5 rounded'>
           <form className="flex flex-col gap-4 mx-auto" onSubmit={handleFrom}>
            <h2 className='text-center text-2xl font-semibold '>Sign Up Here</h2>
            <div>
                    <div className="mb-2 block">
                    <Label htmlFor="name" value="Your name" />
                    </div>
                    <TextInput onChange={handleChange} id="name" name="name" type="text" placeholder="enter your name..." required shadow />
                </div>
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
                  <div className='relative'>
                  <TextInput onChange={handleChange} id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="enter password here..." required shadow />
                    <FaEye onClick={()=>handleShowPassword('password')} className='absolute right-[1rem] bottom-3' />
                  </div>
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <div className='relative'>
                    <TextInput onChange={handleChange} id="repeat-password" name="confirmPassword" type={showRePassword ? 'text' : 'password'} placeholder="enter confirm password ..." required shadow />
                        <FaEye onClick={()=>handleShowPassword('rePassword')} className='absolute right-[1rem] bottom-3' />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        {fromData.authorImg && <img src={fromData.authorImg} width={100} height={100} alt="" />}
                        <Label htmlFor="file-upload" value="Profile image" />
                    </div>
                    <FileInput onChange={fileUpload} required id="file-upload" />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox name='radio' onChange={handleActiveBtn} defaultChecked={false} id="agree" />
                    <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                        terms and conditions
                    </Link>
                    </Label>
                </div>
                <div>
                    <p>have a account please <Link to={'/login'}> <strong  className='text-cyan-600'>Login</strong></Link></p>
                </div>
                {
                    submitBtn ?  <Button type="submit">Register new account</Button> :
                    <Button disabled type="submit">Register new account</Button>
                }
               
            </form>
           </div>
        </div>
    );
};

export default SignUp;