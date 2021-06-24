import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import './Preview.css';
import { db, storage } from '../../firebase';
import firebase from 'firebase';

const Preview = ({ image, setImage, user }) => {

    const history = useHistory();

    useEffect(() => {
        if (!image) {
            history.replace('/');
        }
    }, [image, history])

    const closePreview = () => {
        setImage('');
    };

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(image, "data_url" );

        uploadTask.on(
            "state_changed",
            null,
            (error) => {
                //Error function
                console.log(error);
            },
            () => {
                //complete function
                storage
                  .ref(`posts/${id}`)
                  .getDownloadURL()
                  .then((url) => {
                      db.collection('posts').add({
                          imageUrl: url,
                          username: user.username,
                          read: false,
                          profilePic: user.profilePic,
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      });
                      history.replace('/chats');
                  })
            }
        );
    };

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview_close" />
            <div className="preview_toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={image} alt="" />
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview_sendIcon" />
            </div>
        </div>
    );
};

export default Preview;