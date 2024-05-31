import axios from "axios";
import { useEffect, useState } from "react";

const Award = () => {

const [allDate, setAllData] = useState([])

useEffect(()=>{
    axios.get('award.json')
    .then(res=>setAllData(res.data))
},[])

    return (
        <div className="max-w-7xl mx-auto py-[5rem] px-2">
            <h2 className="text-3xl font-semibold text-center">Awards and Recognitions</h2>
            <p className="text-lg w-[80%] mx-auto text-center pt-1">We help enterprises navigate digital transformation through next-generation IT services and technology solutions. Our commitment and top-notch quality helped us bring success to our clients. Thus, we achieved many awards and recognitions from popular organizations and platforms. See our awards and recognitions below.</p>

            <div className="grid gap-5 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                    allDate.map(data=><div className="border rounded mt-10"  key={data.id}>
                        <figure className="bg-purple-50 py-5 relative">
                            <img className="mx-auto max-h-40 " src={data.img} alt={data.title} />
                            <img className="mx-auto top-0 absolute w-16 h-auto" src={data.logo} alt={data.title} />
                        </figure>
                        <div className="p-3">
                        <h5><strong>{data.title}</strong></h5>
                        <p>{data.des}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Award;