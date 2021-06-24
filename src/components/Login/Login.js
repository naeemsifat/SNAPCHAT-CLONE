import React from 'react';
import Button from '@material-ui/core/Button';
import './Login.css';
import { auth, provider } from '../../firebase';

const Login = ({setUser}) => {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            setUser({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            });
        })
        .catch((err) => alert(err.message)); 
    }
    
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
                <Button variant="outlined" onClick={signIn} className="button" >Sign in</Button>
            </div>
        </div>
    );
};

export default Login;