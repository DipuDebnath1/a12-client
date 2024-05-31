import { Button, Label, TextInput, Textarea } from "flowbite-react";
import PageHeader from "../shared/PageHeader";
import { useState } from "react";

const Contact = () => {

const [fromData, setFromData] = useState({})  

const handleChange = (e) =>{
    const {name, value} = e.target
    setFromData({...fromData, [name]:value})
    
}

const handleFrom = (e) =>{
    e.preventDefault()
    console.log('submit');
    // fromData.reset()
}
 
console.log(fromData);

    return (
        <div>
            <PageHeader title={'Contact'} />
            <div className="max-w-7xl mx-auto px-2">
                <div className="py-[5rem] flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                         <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930141334!2d90.25487247764767!3d23.781067239454273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1710923915669!5m2!1sen!2sbd"  allowfullscreen="" loading="lazy" ></iframe>
                    </div>

                    <div className="w-full flex-1">
                    <form onSubmit={handleFrom} className="card-body w-full">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput onChange={handleChange} id="name" name="name" type="text" placeholder="enter your name..." required shadow />

                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput onChange={handleChange} className="block w-full" id="email" name="email" type="email" placeholder="enter your email address..." required shadow />

                        <div className="mb-2 block">
                            <Label htmlFor="message" value="Message" />
                        </div>
                        <Textarea onChange={handleChange} className="block w-full" id="message" name="message" type="text" placeholder="enter your email address..." required shadow rows={5} />

                        <Button className="mt-3 w-full" type="submit">Send </Button>

                    </div>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;