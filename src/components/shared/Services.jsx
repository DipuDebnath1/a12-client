import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {

    const [allService, setAllService] = useState([])

    useEffect(()=>{
        fetch('services.json')
        .then(res=> res.json())
        .then(data=>setAllService(data))
    },[])

    return (
        <div className="max-w-7xl mx-auto px-2 py-[5rem]">
            <h2 className="text-3xl font-semibold pb-12 text-center"><span className="text-[#7F27FF]">Service</span> We offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 " >
                {
                    allService.map((service)=><div className="flex flex-col border gap-2 shadow-xl group  p-3 rounded-lg" key={service.id}>
                        <Link to={'/'}>
                        <img className="w-[80%] mx-auto group-hover:scale-105 transition" src={service.img} alt={service.title} />
                       <h3 className="text-xl transition font-bold text-center group-hover:text-[#7F27FF]">{service.title}</h3>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Services;