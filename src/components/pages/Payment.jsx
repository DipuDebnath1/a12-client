import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Spinner, Table } from "flowbite-react";
import PageHeader from "../shared/PageHeader";

 
const Payment = () => {

    const {user} = useContext(AuthContext)
    const [allData,  setAllData] = useState(null)


    useEffect(()=>{
        if (user) {
            axios.get(`${import.meta.env.VITE_SERVER_API}/users/payment/${user?.email}`)
            .then(res=>setAllData(res.data))
        }
    },[user])
 
    if (!allData) {
        return <div className="min-h-[80vh] flex items-center justify-center">
            <Spinner color="purple" aria-label="Purple spinner example" />
        </div>
     }

    return (
       <div>
         <PageHeader title={'Salary & Bonus Payment History'} />

         <div className="max-w-7xl mx-auto px-2 py-[2rem]">
             <div>
            <Table className="w-full sticky top-0" striped>
            <Table.Head className="w-full">
          <Table.HeadCell className="text-center">Sl</Table.HeadCell>
          <Table.HeadCell className="text-center">Month</Table.HeadCell>
          <Table.HeadCell className="text-center">Year</Table.HeadCell>
          <Table.HeadCell className="text-center">Salary</Table.HeadCell>
        </Table.Head>
            <Table.Body className="divide-y">
            {
                allData.map((item,i)=><Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                    <Table.Cell className="text-center">{i+1}.</Table.Cell>
                    <Table.Cell className="text-center">{item.month}</Table.Cell>
                    <Table.Cell className="text-center">{item.year}</Table.Cell>
                    <Table.Cell className="text-center">${item.salary}</Table.Cell>

                    </Table.Row>
                )
            }
        </Table.Body>
      </Table>
            </div>
        </div>
       </div>
    );
};

export default Payment;