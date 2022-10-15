import Header from './Header';
import Footer from './Footer';
import '../styles/tabs.css';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from "../App";
import { AiOutlineClose} from 'react-icons/ai';


const PlaydatesTabs = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const {authenticationToken, setAuthenticationToken} = useContext(UserContext);


// API: 
// http://localhost:8080/playdates
// Auth: Bearer Token
// Body
    // {
//     "date": "2022-11-27",
//     "visibility": true,
//     "startTime": "13:00:00",
//     "endTime": "16:30:00",
//     "location": "Excelsior park",
//     "age": "1.5 years old"
// }

    const [playdates, setPlaydates] = useState(
        {
            date: "",
            visibility: false,
            startTime: "",
            endTime: "",
            location: "",
            age: ""
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/playdates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            },
            body: JSON.stringify(playdates)
        }).then(() => {
            console.log("Playdate created")
        }).catch(err => {
            console.log(err);
        })
    }

    // http://localhost:8080/myplaydates
    // Auth: Bearer Token
    // Method: GET
    // Example res:
    // [
    //     {
    //         "id": 7,
    //         "user": {
    //             "password": "$2a$10$NvHnLxYDoMmiFko8R21RP.yuRyOVZY/UpLryHYwNX3hGVQU9kdm0y",
    //             "username": "john"
    //         },
    //         "date": "2022-11-27",
    //         "start_time": "13:00:00",
    //         "end_time": "16:30:00",
    //         "visibility": true,
    //         "location": "Excelsior park",
    //         "age": "1.5 years old"
    //     },
    // ]

    const [myPlaydates, setMyPlaydates] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:8080/myplaydates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            },
        }).then(res => res.json()).then(data => {
            setMyPlaydates(data);
        })

    }, [authenticationToken])
 


    // Only visible playdates
    // api: http://localhost:8080/playdates
    // Auth: Bearer Token
    // Method: GET
    // Example res:
    // [
    //     {
    //         "id": 7,
    //         "user": {
    //             "password": "$2a$10$NvHnLxYDoMmiFko8R21RP.yuRyOVZY/UpLryHYwNX3hGVQU9kdm0y",
    //             "username": "john"
    //         },
    //         "date": "2022-11-27",
    //         "start_time": "13:00:00",
    //         "end_time": "16:30:00",
    //         "visibility": true,
    //         "location": "Excelsior park",
    //         "age": "1.5 years old"
    //     },
    // ]

    const [visiblePlaydates, setVisiblePlaydates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/playdates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            },
        }).then(res => res.json()).then(data => {
            setVisiblePlaydates(data);
        })
    }, [authenticationToken])

    return (
        <div className="wrapper">
            <Header />
            <div className="buttonWrapper">
                <button className={activeTab === 0 ? "tab-button active" : "tab-button"} style={{ borderTopLeftRadius: '10px', dataId: 'home' }} onClick={() => setActiveTab(0)}>Post Playdate</button>
                <button className={activeTab === 1 ? "tab-button active" : "tab-button"} data-id="about" onClick={() => setActiveTab(1)}>About</button>
                <button className={activeTab === 2 ? "tab-button active" : "tab-button"} style={{ borderTopLeftRadius: '10px', dataId: 'contact' }} onClick={() => setActiveTab(2)}>Contact</button>
            </div>
            <div className="contentWrapper">
                {activeTab === 0 && <form className="tab-content active" id="home" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Date* :</label>
                        <input type="date" name="date" id="date" required value={playdates.date} onChange={(e) => setPlaydates({...playdates, date: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="starttime">Start Time* :</label>
                        <input type="starttime" name="starttime" id="starttime" required value={playdates.startTime} onChange={(e) => setPlaydates({...playdates, startTime: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endtime">End Time* :</label>
                        <input type="endtime" name="endtime" id="endtime" required value={playdates.endTime} onChange={(e) => setPlaydates({...playdates, endTime: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="visibility">Visibility* :</label>
                        <div className="radio-group">
                            <input type="radio" name="visibility" id="onlyme" value={playdates.visibility} onChange={(e) => setPlaydates({...playdates, visibility: false})} />
                            <label htmlFor="onlyme">Only me</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="visibility" id="all" value={playdates.visibility} onChange={(e) => setPlaydates({...playdates, visibility: true})} />
                            <label htmlFor="all">all users</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" id="location" value={playdates.location} onChange={(e) => setPlaydates({...playdates, location: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" name="age" id="age" value={playdates.age} onChange={(e) => setPlaydates({...playdates, age: e.target.value})} />
                    </div>
                    <button type="submit">POST</button>
                </form>}


                {activeTab === 1 &&
                    <div className='myplaydate-wrapper'>
                        <table className="tab-content" id="about" style={updateModal ? 
                        { visibility : 'hidden', opacity: '0', } : {} 
                    }>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Visibility</th>
                                    <th>Location</th>
                                    <th>Age</th>
                                </tr>
                            </thead>


                            <tbody cellSpacing="0">
                                {myPlaydates?.map((playdate) => 
                                  (
                                    <tr key={playdate?.id} cellPadding="0">
                                        <td>{playdate.date}</td>
                                        <td>{playdate.start_time}</td>
                                        <td>{playdate.end_time}</td>
                                        <td>{playdate.visibility == true ? 'All users' : 'Only me'
                                        }</td>
                                        <td>{playdate.location}</td>
                                        <td>{playdate.age}</td>
                                        <td className='table-button'><button onClick={() => setUpdateModal(true)}>Update</button></td>
                                    <td className='table-button'><button onClick={() => setDeleteModal(true)}>Delete</button></td>
                                    </tr>
                                  ))}
                            </tbody>



                        </table>

                        <div className={updateModal ? "update-modal show" : "update-modal"}>
                            <div className="update-modal-content">
                               
                                <form className="tab-content active" id="update">
                                <span className="close" onClick={() => setUpdateModal(false)}><AiOutlineClose/></span>
                                    <div className='update-form'>
                                        <div className="form-group">
                                            <label htmlFor="date">Date* :</label>
                                            <input type="date" name="date" id="date" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="starttime">Start Time* :</label>
                                            <input type="starttime" name="starttime" id="starttime" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endtime">End Time* :</label>
                                            <input type="endtime" name="endtime" id="endtime" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="visibility">Visibility* :</label>
                                            <div className="radio-group">
                                                <input type="radio" name="visibility" id="onlyme" value="onlyme" />
                                                <label htmlFor="onlyme">Only me</label>
                                            </div>
                                            <div className="radio-group">
                                                <input type="radio" name="visibility" id="all" value="all" />
                                                <label htmlFor="all">all users</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location">Location:</label>
                                            <input type="text" name="location" id="location" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="age">Age:</label>
                                            <input type="number" name="age" id="age" />
                                        </div>
                                        <button type="submit">POST</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                            <div className={deleteModal ? "delete-modal show" : "delete-modal"}>
                                <div className="delete-modal-content">
                                    <span className="close" onClick={() => setDeleteModal(false)}><AiOutlineClose/></span>
                                    <p>Are you sure to delete this playdate ?</p>
                                    <div className='delete-modal-buttons-wrapper'>
                                        <button className='delete-modal-button' onClick={() => setDeleteModal(false)}>Cancel</button>
                                        <button className='delete-modal-button' onClick={() => setDeleteModal(true)}>Confirm</button>
                                    </div>
                                </div>
                            </div>

                    </div>
                }

                {activeTab === 2 && <div className='all-plays-tab'>
                    <div className="add-button-wrapper">
                        <button onClick={() => setActiveTab(0)} className='add-play'>Add</button>
                    </div>
                    <table className="tab-content" id="about">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Location</th>
                                <th>Age</th>
                                <th>Host</th>
                            </tr>
                        </thead>


                        <tbody cellSpacing="0">
                            {visiblePlaydates?.map((playdate) => 
                                  (
                                    <tr key={playdate?.id} cellPadding="0">
                                        <td>{playdate.date}</td>
                                        <td>{playdate.start_time}</td>
                                        <td>{playdate.end_time}</td>
                                        <td>{playdate.location}</td>
                                        <td>{playdate.age}</td>
                                        <td>{playdate.user.username}</td>
                                    </tr>
                                  ))}

                        </tbody>



                    </table> </div>}
            </div>
            <Footer />
        </div>
    )
}

export default PlaydatesTabs