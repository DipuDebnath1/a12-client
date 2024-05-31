
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/shared/Navbar'
import MainFooter from "./components/shared/Footer";
import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';
import { Spinner } from 'flowbite-react';



function App() {

const {user, userDetails} = useContext(AuthContext)

if (user && !userDetails) {
      return <div className="min-h-[80vh] flex items-center justify-center">
               <Spinner color="purple" aria-label="Purple spinner example" />
            </div>
}

 else return (
    <>
    <Header />
    <Outlet></Outlet>
    <MainFooter />

    </>
  )
}

export default App
