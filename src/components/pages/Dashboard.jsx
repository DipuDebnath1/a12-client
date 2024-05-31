import { Link, Outlet } from "react-router-dom";
 
const Dashboard = () => {
    return (
        <div className="flex gap-5 max-w-7xl h-[90vh] overflow-y-auto mx-auto px-2 sm:px-4">
            <div className=" md:w-3/12 sticky top-4rem ">
                <ul className="flex flex-col gap-1 overflow-y-scroll h-full">
                    <h2 className="px-5 py-2 text-xl font-bold text-purple-600"> Select Topic:</h2>
                <li className="px-5 py-2 border-b border-purple-300 text-lg"><Link to={'/dashboard/employee-list'}>Employee List</Link></li>
               
                <li className="px-5 py-2  border-b border-purple-300 text-lg"><Link to={'/'}>Employee List</Link></li>
                <li className="px-5 py-2 border-b border-purple-300 text-lg"><Link to={'/'}>Employee List</Link></li>
                </ul>
            </div>
            <div className="md:w-9/12 h-full dashboard overflow-auto">
                <Outlet /> 
            </div>
        </div>
    );
};

export default Dashboard;
