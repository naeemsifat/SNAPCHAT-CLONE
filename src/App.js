
import './App.css';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Chats from './components/Chats/Chats';
import ChatView from './components/ChatView/ChatView';
import Login from './components/Login/Login';
import { auth } from './firebase';
import NoMatch from './components/NoMatch/NoMatch';

function App() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState('');
  const [dbStoreImg, setDbStoreImg] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        });
      }
      else {
        setUser(null);
      }
    })
  }, []);

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login setUser={setUser} />
          ) : (
            <>
              <img
                src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
                alt=""
                className="app_logo"
              />
              <div className="app_body">
                <div className="app_background">
                  <Switch>
                    <Route exact path="/chats/view">
                      <ChatView dbStoreImg={dbStoreImg} />
                    </Route>
                    <Route exact path="/preview" >
                      <Preview user={user} image={image} setImage={setImage} />
                    </Route>
                    <Route exact path="/chats" >
                      <Chats user={user} setDbStoreImg={setDbStoreImg} />
                    </Route>
                    <Route exact path="/" >
                      <WebcamCapture setImage={setImage} />
                    </Route>
                    <Route path='*'>
                      <NoMatch/>
                    </Route>
                  </Switch>
                </div>
              </div>
              <Switch>
                
              </Switch>
            </>
          )

        }
      </Router>
    </div>
  );
}

export default App;
