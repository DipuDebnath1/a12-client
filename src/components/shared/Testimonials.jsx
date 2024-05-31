import axios from "axios";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([])

    useEffect(()=>{
        axios.get('testimonials.json')
        .then((res)=>{
            setTestimonials(res.data);
        })
    },[])

    return (
       <div className="bg-purple-50 py-[5rem]">
         <div className="max-w-7xl mx-auto px-2">
            <h2 className="text-3xl font-semibold text-center text-[#35374]">Testimonials</h2>
            <p className="text-center text-lg pt-1">Discover what our clients say about their experiences with us.</p>

            <div className="pt-12">
            <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.75': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 2,
            spaceBetween: 20,
          }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            testimonials.map((item,i)=><SwiperSlide key={i}>
                <div className="bg-purple-300 cursor-pointer px-5 py-4 rounded flex flex-col">
                    
                    <p className="text-lg flex-grow">{item.testimonial}</p>
                    <div className="flex gap-5 items-center pt-5">
                        <figure>
                            <img className="w-20 h-20 rounded-full object-cover" src={item.img} alt={item.name} />
                        </figure>
                        <div>
                            <h5 className="text-xl font-semibold text-[#35374B]">{item.name}</h5>
                            <p className="text-lg"><small>{item.designation}</small></p>
                        </div>
                     </div>
                </div>
            </SwiperSlide>)
        }
        
      </Swiper>
            </div>
        </div>
       </div>
    );
};

export default Testimonials;