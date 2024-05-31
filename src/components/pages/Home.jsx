 import About from "../shared/About";
import Award from "../shared/Award";
import Banner from "../shared/Banner";
import Services from "../shared/Services";
import Testimonials from "../shared/Testimonials";
 
const Home = () => {

     
    return (
        <div>
         <Banner />
         <About/>
         <Services />
         <Testimonials />
         <Award />
        </div>
    );
};

export default Home;