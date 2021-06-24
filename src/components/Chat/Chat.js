import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import StopIcon from '@material-ui/icons/Stop';
import TimeAgo from 'react-timeago';
import './Chat.css';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';

const Chat = ({ id, profilePic, imageUrl, username, read, timestamp, setDbStoreImg }) => {
    const history = useHistory()
    let componentMounted = true;
    const open = () => {
        if(!read)
        {
            db.collection('posts').doc(id).set(
                {
                    read: true,
                },
                {
                    merge: true,
                }
            );
            if(componentMounted)
            {
                setDbStoreImg(imageUrl);
            }
            history.push('/chats/view');
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar className="chat_avatar" src={profilePic} />
            <div className="chat_info">
                <h4>{username}</h4>
                <p>{ !read && 'Tap to view - '} 
                   <TimeAgo date = {new Date(timestamp?.toDate()).toUTCString()} /> </p>
            </div>
            {!read && <StopIcon className = "chat_readIcon" />}
        </div>
    );
};

export default Chat;