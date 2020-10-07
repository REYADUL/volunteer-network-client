import React, { useContext, useState } from 'react';
import './Register.css'
import logo from '../../logos/Group 1329.png'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import { UserContext } from '../../App';

const Register = () => {
    const {taskId} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [eventDate,setEventDate]=useState(new Date());

    const SelectedEvent = fakeData;
    
    const userInfo = SelectedEvent.filter(task => task.id == taskId)
    const {name,image} = userInfo[0]; 

    const newEvent = {eventName: name, image};

    const history = useHistory();
    const location = useLocation();

    const handleEventDate=(date)=>{
        let newDate ={...eventDate}
        newDate =date;
        console.log(newDate)
        setEventDate(newDate());
        
    }
    const handleRegistration =()=>{
        const newRegistration ={...loggedInUser,...newEvent,...handleEventDate}
        fetch('https://secret-shelf-55474.herokuapp.com/addEvent',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newRegistration)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            history.push('/userEvent')
        })
    }


    return (
        <div class="register-bg">            
            <div className="container">                                
                <div className="head-logo">
                    <Link to="/"><img src={logo} alt=""/></Link>
                </div>

                <div className="row">
                    <div className="col-md-3">

                    </div>

                    <div className="col-md-6">
                        <form action="" class="registration-form">
                            <h3 class="mb-3">Register as a Volunteer</h3>
                            <input type="text" name="name" class="form-control mb-3" value={loggedInUser.name} id=""/>
                            <input type="email" name="email" class="form-control mb-3"  value={loggedInUser.email} id=""/>
                            <input type="date" name="date" class="form-control mb-3"  onChange={handleEventDate} id=""/>
                            <input type="text" name="description" class="form-control mb-3" placeholder="Description" id=""/>
                            <input type="text" name="" class="form-control mb-3" value={name} id=""/>
                            
                        </form>
                        <button onClick ={handleRegistration} class="btn btn-danger form-control">Registration</button>
                    </div>

                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;