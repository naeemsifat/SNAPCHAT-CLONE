import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './ChatView.css';
const ChatView = ({ dbStoreImg }) => {
    const history = useHistory();
    

    useEffect(() => {
        if (!dbStoreImg) {
            exit();
        }
    }, [dbStoreImg]);

    const exit = () => {
        history.replace('/chats');
    }

    return (
        <div className="chatView">
            <img  src={dbStoreImg} onClick={exit} alt="" />
            <div className="chatView_timer">
                <CountdownCircleTimer
                    isPlaying
                    duration = {10}
                    strokeWidth = {6}
                    size = {50}
                    colors = {[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => {
                        if(remainingTime === 0)
                        {
                            exit();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
            )
        </div>
    );
};

export default ChatView;