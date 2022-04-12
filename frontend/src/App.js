import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './component/auth/Login';
import Quora from './component/Quora';
import { login, selectUser } from './feature/userSlice';
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid
        }))
        console.log("Auth user",authUser)
      }
    })
  }, [dispatch])
  return (
    <div className="App">
      {
        user? (<Quora/>):(<Login/>)
      }
      
    </div>
  );
}

export default App;
