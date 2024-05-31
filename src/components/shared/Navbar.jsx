
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

export default function Header() {
  const {user , logOut, userDetails} = useContext(AuthContext)
 

  return (
    <div className='shadow sticky top-0 z-50 bg-white'>
    <Navbar fluid rounded className='bg-transparent max-w-7xl mx-auto'>
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sun-View</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
           {
              !user ? <Button color='purple'><Link to={'login'}>Login</Link></Button> :
              <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar className='border-2 rounded-full p-1' alt="User settings" img={user.photoURL} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold">
                  {user.displayName ? user.displayName : 'anonimus'}
                </span>
                <span className="block truncate text-sm font-medium">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={logOut}>Sign out</Dropdown.Item>
            </Dropdown>
           }

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <NavLink to="/" active> Home</NavLink>
            <NavLink to="contact">Contact Us</NavLink>
            <NavLink to="service">Service</NavLink>
            { (user && !userDetails.role==='admin') && <NavLink to="profile">Profile</NavLink>}
            {
             ( user && userDetails.role==="hr" || user && userDetails.role==="admin") &&
              <NavLink to="/dashboard/employee-list">Dashboard</NavLink> 
            }
            {
              user && userDetails.role==="user" && <NavLink to="/payment">Payment</NavLink> 
            }
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}
