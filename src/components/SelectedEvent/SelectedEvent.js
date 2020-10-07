import React, { useContext, useEffect, useState } from 'react';
import logo from '../../logos/Group 1329.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const SelectedEvent = () => {

    const [selectedEvents, setSelectedEvents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [id,setId]=useState();

    useEffect( () => {
        fetch('https://secret-shelf-55474.herokuapp.com/taskEvent?email='+loggedInUser.email)

        .then(res => res.json())
        .then(data => {
            setSelectedEvents(data)
        })
            
    }, [id])
     const handleDelete=(id)=>{
        console.log(id);
        fetch(`https://secret-shelf-55474.herokuapp.com/deleteEvent/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log('deleted successfully')
                setId(data);
            })

    }

    const allEvents = selectedEvents.map(data => {
        const { _id, image, eventName} = data;
        return (
            <div class="card d-flex float-left" style={{ width: '30%', marginRight: '10px',marginBottom:'10px' }}>
            <img  src={ image} class="card-img-top" alt=" "/>
            <div class="card-body">
                <h3 class="card-text">{eventName}</h3>
            </div>
            <div class="d-flex align-items-center flex-column">
                <div class="mt-5 p-2">
                        <button class="btn btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
                </div>

            </div>
            </div>
        )
    })






    return (
        <div>
            <div className="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                        <a  href="/home"><img class="img-fluid w-25" src={logo} alt=""/></a>
                    

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to="/" class="nav-link">Home</Link>
                            </li>

                            <li class="nav-item">
                            <Link to="/" class="nav-link">Donation</Link>
                            </li>

                            <li class="nav-item">
                            <Link to="/" class="nav-link">Events</Link>
                            </li>

                            <li class="nav-item">
                            <Link to="/" class="nav-link">Blog</Link>
                            </li>

                            <li class="nav-item">
                            <Link to="/" class="nav-link" style={{color:"red"}}>{loggedInUser.name}</Link>
                            </li>
                        </ul>
                    </div>
                    </nav>
                    <div class="row">
                        <div class="col-md-12" >
                           <p style={{color:"red"}} > you have  {selectedEvents.length} selected events</p> 
                           
                           {allEvents}
                        </div>
                    </div>
                    
            </div>



        </div>
    );
};

export default SelectedEvent;