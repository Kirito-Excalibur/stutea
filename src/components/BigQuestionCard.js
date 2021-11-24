import React, { useEffect, useState } from 'react'
import dateFormat from "dateformat";
import { useHistory, Link } from "react-router-dom";
import {ReactComponent as AddQuesGreen} from "../Assets/Click/answer_green.svg"
import {ReactComponent as AddQuesMagenta} from "../Assets/Click/answer_magenta.svg"
import "../css/BigQuestionCard.css"
export const BigQuestionCard = (props) => {
    const {color, content}=props
    const host = process.env.REACT_APP_BACKEND_URL;
    const date = content.timestamp
    const initial = {
        first: "",
        last: "",
        username: "",
        email: "",
        dp: "",
        city: "",
    };
    const [userData, setUserData] = useState(initial);
    const getUserData = async (userId) => {
        const response = await fetch(`${host}/api/user/id/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        })
        const json = await response.json();
        setUserData(json);
    };
    useEffect(() => {
        getUserData(content.user)
        return () => {
            
        }
        // eslint-disable-next-line
    }, [])
    let history = useHistory();
    const id = content._id;
    const handleClick = () => {
        history.push(`/answer/${id}`);
    };
    return (
        <div className={`big-ques-card-${color}`}>
            <div className={`question-${color}`}>
                {content.question}
            </div>
            <div className="tags">
                {content.tags.slice(0,3).map((tag)=><Link key={tag} to={`/query?tag=${tag}`} className={`tag-${color}`}>{tag}</Link>)}
            </div>
            <div className="details">
                <div className="user">
                    <div className="user-dp-ques">
                        <img src={userData.dp} alt="dp" className="profile-pic-ques"/>
                        {/* <ProfileIcon className="profile-pic-ques"/> */}
                    </div>
                    <div className="user-name-ques">
                        <div className="name-ques">
                            {userData.first + " " + userData.last}
                        </div>
                        <div className="date-ques">
                        {dateFormat(date, "mmmm dS, yyyy, h:MM TT")}
                        </div>
                    </div>
                </div>
                <div className="answer-button-big">
                    {color==='green' ? <AddQuesGreen className="btn-add" onClick={handleClick}/>: <AddQuesMagenta className='btn-add' onClick={handleClick}/>}
                </div>
            </div>
        </div>
    )
}
