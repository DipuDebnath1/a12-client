// 
import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AuthContext } from "../../providers/AuthProvider";


const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

 
const UserDetails = () => {
     const [userDetails, setUserDetails] = useState(null)
     const [chartData, setChartData] = useState(null)
     const [salaryChartYear, setSalaryChartYear] = useState('year_2024')
     const {user} = useContext(AuthContext)
 
    const width = 800
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_API}/users/${user.email}`)
        .then(res=> setUserDetails(res.data))
    },[])

    useEffect(()=>{
        setChartData(userDetails?.payment_history?.data[salaryChartYear])
        console.log('efact update');
    },[userDetails,salaryChartYear])

  


 
      const handleChartData = (id) =>{
        setSalaryChartYear(id)
       }
       if (!userDetails) {
        return  <div className="min-h-[80vh] flex items-center justify-center">
        <h2  className=" text-center text-5xl font-semibold  text-purple-500">loading...</h2>
   </div>
     }

     return (
        <div className="w-[95%] mx-auto p-5 mt-5 border ">
           <div  className="flex flex-col gap-5">
            <figure>
                <img className="w-[7rem] h-[7rem] mx-auto object-top rounded-full p-2 border border-gray-400" src={userDetails?.img} alt={userDetails?.name} />
            </figure>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
                <label htmlFor="name"> Name</label>
            <input className="input input-bordered w-full" id="name" name="name" type="text" defaultValue={userDetails?.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input className="input input-bordered w-full" id="email" name="email" type="email" defaultValue={userDetails?.email} />
            </div>
            <div>
                <label htmlFor="bank_Account">Bank Account </label>
                <input className="input input-bordered w-full" id="bank_Account" name="bank_Account" type="number" defaultValue={userDetails?.bank_Account} />
            </div>
            <div>
                <label htmlFor="salary">Salary</label>
                <input className="input input-bordered w-full" id="salary" name="salary" type="number" defaultValue={userDetails?.salary} />
            </div>
 
          </div>
           </div>
            {/* salary history  */}
            {/**/}
           {
             chartData &&  <div className="mt-5">
             <h3 className="font-semibold">2024 Year payment History 
             {salaryChartYear=='year_2024' ? <small onClick={()=>handleChartData('year_2023')} className="text-purple-500 cursor-pointer"><strong className="border p-1 ml-1 border-purple-500">show 2023</strong></small> :<small onClick={()=>handleChartData('year_2024')} className="text-purple-500 cursor-pointer"><strong className="border p-1 ml-1 border-purple-500">show 2024</strong></small> }
             </h3>
             
                  <BarChart

                 className="w-full"
                     width={width}
                     height={300}
                     data={chartData}
                     margin={{
                         top: 20,
                         right: 30,
                         left: 20,
                         bottom: 5,
                     }}
                     >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey='month'/>
                     <YAxis />
                     <Bar dataKey="salary" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                         {chartData?.map((entry, index) => (
                             // console.log(entry)
                         // <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                         <Cell key={`cell-${index}`} fill={userDetails?.salary<=entry.salary ? 'green' : 'red'} />
                         ))}
                     </Bar>
                     </BarChart>
             
         </div>
           }
        </div>
    );
};

export default UserDetails;