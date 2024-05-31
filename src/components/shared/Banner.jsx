// Import Swiper React components
import winnerMan from "../../assets/images/banner/winner-man1.png";
import winnerTeam from "../../assets/images/banner/winner-team.png";
import teamWork from "../../assets/images/banner/team-work.png";
import coverImg from "../../assets/images/banner/banner-bg.png"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Banner() {

   const mainDiv = {
    // background: '#F3CCF3',
    background: `url('${coverImg}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
  }

    const bannerInfo = [
        {img:winnerTeam, title:'Best Corporate Company Award Winner 2024', des:" 2024's Best Corporate Company. Trust our innovation-driven approach for unparalleled solutions and a brighter future."},
        {img:teamWork, title:'Work Opportunities in dedicated Team', des:'Discover Exciting Work Opportunities in a Dynamic and Supportive Team Environment'},
        {img:winnerMan, title:'Best Employee Award winners', des:'Be Part of Excellence - Work with Dedication and Win Best Employee Awards with Us!'}
    ]
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
        bannerInfo.map((item,i)=>  <SwiperSlide key={i}>
        <div style={mainDiv}>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center p-5 h-[100vh] md:h-[80vh] max-w-7xl mx-auto gap-2">
          <div className="flex-1">
              <h1 className="text-5xl leading-[3.3rem] font-semibold text-[#211951]">{item.title}</h1>
              <p className="text-xl mt-4 font-semibold text-[#191919]">{item.des}</p>
          </div>
          <div className="flex-1">
            <img  className="mx-auto h-[50vh] md:h-auto" src={item.img} alt="" />
          </div>
        </div>
        </div>
      </SwiperSlide>)
        }
      
      </Swiper>
    </>
  );
}
