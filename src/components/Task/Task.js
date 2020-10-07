import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Task.css'

const Task = ({task}) => {

    const history = useHistory();

    const handleRegister = () =>{
        history.push(`/register/${task.id}`)
    }
    return (
        <div className="col-md-3 eventList">
                <Link onClick={handleRegister}><img src={task.image} alt=""/></Link>
                <div className="eventName">
                    <Link onClick={handleRegister}><h5>{task.name}</h5></Link>
                </div>
        </div>
    );
};

export default Task