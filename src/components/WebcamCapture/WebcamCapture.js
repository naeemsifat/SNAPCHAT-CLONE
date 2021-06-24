import React, { useCallback, useRef } from 'react';
import './WebcamCapture.css';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
};

const WebcamCapture = ({setImage}) => {
    const webcamRef = useRef(null);
    const history = useHistory();

    const capture = useCallback(() =>{
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        history.push('/preview');
    },[webcamRef, history, setImage]);

    return (
        <div className = "webcamCapture">
            <Webcam
              audio = {false}
              height = {videoConstraints.height}
              ref = {webcamRef}
              screenshotFormat = "image/jpeg"
              width = {videoConstraints.width}
              videoConstraints = {videoConstraints}
            />
            <RadioButtonUncheckedIcon
              fontSize ="large"
              className = "WebcamCapture_button"
              onClick = {capture}
            />
            
        </div>
    );
};

export default WebcamCapture;