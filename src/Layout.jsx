import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router'
import Modal from './components/Model';
import { useFirebaseContext } from './context/FirebaseContext';
import LogoutModel from './components/LogoutModel';

const Layout = () => {
  
  const { appUser, signout } = useFirebaseContext();
  
  const navigate = useNavigate();
  const [isLogoutModelVisible,setIsLogoutModelVisible] = useState(false);
  
  function onLogOut(){
        //actual signout logic
        signout()
            .then(
                (success) => {
                    setIsLogoutModelVisible(false);
                    navigate('/login');
                    console.log("Redirecting to Login Page");
                })   
            .catch((err) => {
                console.error("Error while signout :: " , err);
            })
  }

  return (
    <div className='w-full h-screen flex flex-col'>
        <Navbar 
            user={appUser}
            //this functions only represent what happens when user clicked on them
            onLogIn={() => navigate('/login')}
            onLogOut={() => setIsLogoutModelVisible(true)}
            onSignUp={() => navigate('/signup')}
        />
        <Outlet/>
        <Modal 
            open={isLogoutModelVisible} 
            onClose={() => setIsLogoutModelVisible(false)} >
            <LogoutModel 
                onLogout={onLogOut}
                onClose={() => setIsLogoutModelVisible(false)}
          />
        </Modal>
    </div>
  )
}

export default Layout