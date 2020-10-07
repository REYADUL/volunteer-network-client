import React, { useContext } from 'react';
import './Login.css'
import logo from '../../logos/Group 1329.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import google from '../../logos/google.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';



const Login = () => {

    const [logeedInuser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };



    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);

    }


    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log('working');
        firebase.auth().signInWithPopup(provider)

            .then(res => {
                console.log(res);
                const { displayName, email } = res.user;
                const signedInUser = {
                    name: displayName,
                    email: email
                };
                setLoggedInUser(signedInUser);
                storeAuthToken();

                console.log(signedInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
            }).catch(function (error) {
                // Handle error
            });
    }

    return (
        <div class="loginBackground">
            <div className="container">
                <div className="head-logo">
                    <img src={logo} alt="" />
                </div>

                <div className="row">
                    <div className="col-md-3">

                    </div>

                    <div className="col-md-6">
                        <form onSubmit={handleGoogleSignIn} class="login-form">
                            <h3 class="mb-3">Google Sign In </h3>
                            <div className="loginButton">
                                <button type='submit'><img src={google} alt="" /> Continue with Google</button>

                            </div>
                            <p>Don't have an account? <Link to="/login">Create an Account</Link></p>
                        </form>
                    </div>

                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;