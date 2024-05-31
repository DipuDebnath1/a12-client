import axios, { Axios, AxiosError } from "axios";
import { Button, Spinner, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
 
 
const EmployeeList = () => {
    const {userDetails} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [refetch, setRefetch] = useState(0)

    useEffect(()=>{
       axios.get(`${import.meta.env.VITE_SERVER_API}/users`)
        .then(res=>setUsers(res.data))
    },[refetch])

    const handleUpdate = (id,key,value)=>{
        const data = {[key]:value} 

        axios.put(`${import.meta.env.VITE_SERVER_API}/users/${id}`, data)
        .then(()=>setRefetch(refetch+1))
    }

    const handleUpdateRole = (id, role) =>{
        const data = {role:role}
        axios.put(`${import.meta.env.VITE_SERVER_API}/role/${id}`,data)
        .then(()=>setRefetch(refetch+1))
 
    }
    
    const handleFireEmployee =(id) =>{
        axios.delete(`${import.meta.env.VITE_SERVER_API}/user/${id}`)
        .then(()=>setRefetch(refetch+1))
    }

    if (!users) {
        return <div className="min-h-[80vh] flex items-center justify-center">
        <Spinner color="purple" aria-label="Purple spinner example" />
     </div>
     }

    return (
        <div className="w-full mt-5">
            <div className="overflow-x-auto w-full">
                
      <Table className="w-full sticky top-0" striped>
      <Table.Head className="w-full bg-red-600">
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
         {userDetails.role=="hr" && <Table.HeadCell>Bank Account</Table.HeadCell>}
         {userDetails.role=="hr" && <Table.HeadCell>Salary</Table.HeadCell>}
          {userDetails.role=="hr" && <Table.HeadCell>Pay-S</Table.HeadCell>}
          {userDetails.role=="hr" && <Table.HeadCell>Details</Table.HeadCell>}
          {userDetails.role=="hr" && <Table.HeadCell>Verified</Table.HeadCell>}
 
          {userDetails.role=="admin" && <Table.HeadCell>Designation</Table.HeadCell>}

          {userDetails.role=="admin" && <Table.HeadCell>Make HR/USER</Table.HeadCell>}
          {userDetails.role=="admin" && <Table.HeadCell>Action</Table.HeadCell>}

        </Table.Head>

        <Table.Body className="divide-y">
            {
                users.map((user,i)=><Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"> <h4 className="font-semibold">{user.name}</h4>  </Table.Cell>

                    <Table.Cell>{user.email}</Table.Cell>
                   {userDetails.role=="hr" && <Table.Cell>{user.bank_Account}</Table.Cell>}

                    { userDetails.role=="hr" && <Table.Cell>${user.salary}</Table.Cell>}

                    {userDetails.role=="hr" && <Table.Cell><Button color={user.pay ? 'purple' : 'blue'} className=" border-none outline-none">{user.pay ? 'paid':'pay'}</Button></Table.Cell>}

                    {userDetails.role=="hr" && <Table.Cell><Button color="purple" className=" border-none outline-none"><Link to={`/dashboard/employee-list/${user.email}`}> <FaEdit /> </Link> </Button></Table.Cell>}

                    {userDetails.role=="hr" && <Table.Cell><Button onClick={()=>handleUpdate(user._id,'verified' , !user.verified)} color={user.verified ? 'success' : 'failure'} className=" border-none outline-none">{user.verified ? <SiNike className="font-bold" />:<ImCross />}</Button></Table.Cell>}

                    {userDetails.role=="admin" && <Table.Cell><p className='bold'>{user.role}</p></Table.Cell>}
                    
                    {userDetails.role=="admin" && <Table.Cell>
                        { 
                        user.role=="user" && <p><Button onClick={()=>handleUpdateRole(user._id, 'hr')} color="success">Make HR</Button></p>
                        }
                        { 
                        user.role=="hr" && <p>{<Button onClick={()=>handleUpdateRole(user._id, 'user')} color="warning">Make Employee</Button>}</p>
                        }
                        </Table.Cell>}

                    {userDetails.role=="admin" && <Table.Cell><p>{user.role!=='admin' &&<Button onClick={()=>handleFireEmployee(user._id)} color="failure">Fire</Button>}</p></Table.Cell>}

                  </Table.Row>
                )
            }
        </Table.Body>
      </Table>

    
    </div>
        </div>
    );
};

export default EmployeeList;