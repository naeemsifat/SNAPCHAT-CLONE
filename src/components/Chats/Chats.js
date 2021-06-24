import React from 'react';
import './Chats.css';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../../firebase';
import Chat from '../Chat/Chat';
import { useHistory } from 'react-router-dom';

const Chats = ({ setDbStoreImg, user }) => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    useEffect(() => {
        db.collection('posts')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            })
    }, []);

    const signOut = () => {
        // eslint-disable-next-line no-restricted-globals
        let logout = confirm('Are you sure you want to log out?');
        if(logout)
        {
            auth.signOut();
        }
    }
    
    const snapShot = () => {
        history.push('/');
    }
    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar
                    src={user.profilePic}
                    className="chats_avatar"
                    onClick={signOut}
                />
                <div className="chats_search">
                    <SearchIcon className="chats_searchIcon" />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubbleIcon className="chats_chatIcon" />
            </div>
            <div className="chats_post">
                {
                    posts.map(
                        ({ id,
                            data: { profilePic, imageUrl, username,
                                read, timestamp }
                        }) => (
                            <Chat
                                key={id}
                                id={id}
                                profilePic={profilePic}
                                imageUrl={imageUrl}
                                username={username}
                                read={read}
                                timestamp={timestamp}
                                setDbStoreImg={setDbStoreImg}
                            />

                        ))
                }

            </div>
            <RadioButtonUncheckedIcon
                fontSize="large"
                className="chats_takeSnap"
                onClick={snapShot}
            />
        </div>
    );
};

export default Chats;