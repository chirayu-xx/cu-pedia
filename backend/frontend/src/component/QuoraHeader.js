import React, { useState } from 'react'
import HomeIcon from "@material-ui/icons/Home";

import {
  ExpandMore,
  PeopleAltOutlined,
  Search,
  // ExpandMore,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, Button, Input} from "@material-ui/core";
import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css'
import axios from 'axios'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout, selectUser } from '../feature/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.PNG';


function QuoraHeader() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const handleLogout = () =>{
    if(window.confirm("Are you sure to Logout?")){
    signOut(auth)
    .then(() =>{
      dispatch(logout())
      console.log("Logged out successffully!!")
    })
    .catch((e) => {
      console.log("Error while Logging out");
    })
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const Close = <CloseIcon />;
  const [question,setQuestion] = useState("");
  const handleSubmit = async ()=>{
    if(question !== ""){
      const config = {
        headers: {
          "Content-Type" : "application/json"
        }
      }
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user
      }
      await axios
        .post('/api/questions', body, config)
        .then((res) =>{
        console.log(res.data);
        alert(res.data.message);
        window.location.href= "/";
      }).catch((e) => {
        console.log(e);
        alert("Oops!! Question cannot be added")
      })
    }
  }

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src={logo}
            alt="logo"  
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <span className='qHeader__icon'>
            <HomeIcon />
            </span>
          </div>
        
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
  
        </div>
        <div className="qHeader__input">
          <Search />
          <input type="text" placeholder="Search questions" />
        </div>
        <div className="qHeader__Rem">
          <span onClick={() => setProfileModal(true)}> 
          <Avatar src= {user?.photo}/> 
          <Modal
            open={profileModal}
            closeIcon={Close}
            onClose={() => setProfileModal(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className='user'>
            <Avatar className='avatar' src= {user?.photo}/>
            <div className='user_details'>
              Name: {user?.userName}
            </div>
            <div className='user_details'>
            Email: {user?.email}
            </div>
            
            </div>
            
          </Modal>
          </span>
          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Button onClick={handleLogout}>LogOut</Button>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar src={user?.photo} className="avatar" />
              <div className="modal__scope">
                <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
            <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl }
                  onChange={(e)=> setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional:inclue a link that gives context"
                />
                {
                  inputUrl !== "" && <img style={{
                    height:'40vh',
                    objectFit:"contain",
                  }} src={inputUrl} alt ='img'/>
                }
                
              </div>
            </div>
            <div className="modal__buttons">
              <button onClick={handleSubmit} type="submit" className="add">
                Add Question
              </button>
              <button
               className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default QuoraHeader