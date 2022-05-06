import React, { useState } from 'react'
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {signInWithPopup} from 'firebase/auth'
import { auth, provider, provider2 } from '../../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import logo from "../logo.PNG"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleSignIn = async() => {
       await signInWithPopup(auth, provider).then((result) => {
           console.log(result)
       }).catch((error) => {
           console.log(error);
       });
    }
    const FBsignIn = async() => {
      await signInWithPopup(auth, provider2).then((result) => {
          console.log(result)
      }).catch((error) => {
          console.log(error);
      });
   }
  const registerSignin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((auth) => {
      console.log(auth);
    })
    .catch(e => {
      alert("Email Already in Use");
    })
  }
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then((auth) => {
      console.log(auth);
    })
    .catch(e => {
      alert("Incorrect Email or Password");
    })
  }
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src={logo}
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted with ❤️ by{" "} CUPedia
          </p>
          
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={handleSignIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span onClick={FBsignIn}>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <div className="login__label">
              <h4>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={signIn}>Login</button>
            </div>
            <button onClick={registerSignin}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Q&A. 2022</p>
        </div>
      </div>
    </div>
  );
}
export default Login