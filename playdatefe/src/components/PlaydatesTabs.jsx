import Header from './Header';
import Footer from './Footer';
import '../styles/tabs.css';
import { useState, useContext, useReducer, useEffect } from 'react';
import { UserContext } from "../App";
import { AiOutlineClose } from 'react-icons/ai';


const PlaydatesTabs = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { authenticationToken, setAuthenticationToken } = useContext(UserContext);
    const [playdates, setPlaydates] = useState(
        {
            date: "",
            visibility: false,
            startTime: "",
            endTime: "",
            location: "",
            age: ""
        }
    );
    const [myPlaydates, setMyPlaydates] = useState([]);
    const [visiblePlaydates, setVisiblePlaydates] = useState([]);
    const [updatePlaydate, setUpdatePlaydate] = useState(
        {
            date: "",
            visibility: false,
            start_time: "",
            end_time: "",
            location: "",
            age: ""
        }
    )
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
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
            forceUpdate();
            alert("Playdate created");
        }).catch(err => {
            console.log(err);
        })
    }

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
    }, [authenticationToken, reducerValue])


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

        return () => {
            setVisiblePlaydates([]);
        }
    }, [authenticationToken, deleteModal, updateModal])


    const handleUpdatedForm = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/playdates/${playdates.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            },
            body: JSON.stringify(updatePlaydate)
        }).then(() => {
            alert("Playdate updated");
            forceUpdate();
            setUpdateModal(false);
        })
    }

    const handleDeletePlaydate = (e) => {
        fetch(`http://localhost:8080/playdates/${updatePlaydate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            }
        }).then(() => {
            alert("Playdate deleted");
            forceUpdate();
            setDeleteModal(false);
        })
    }

    const handleUndo = (e) => {
        // re rendering the update modal
        setUpdatePlaydate(playdates);
        setUpdateModal(true);
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="buttonWrapper">
                <button className={activeTab === 0 ? "tab-button active" : "tab-button"} style={{ borderTopLeftRadius: '10px', dataId: 'home' }} onClick={() => setActiveTab(0)}>Post a Playdate</button>
                <button className={activeTab === 1 ? "tab-button active" : "tab-button"} data-id="about" onClick={() => setActiveTab(1)}>My Playdates</button>
                <button className={activeTab === 2 ? "tab-button active" : "tab-button"} style={{ borderTopLeftRadius: '10px', dataId: 'contact' }} onClick={() => setActiveTab(2)}>All Playdates</button>
            </div>
            <div className="content-wrapper">
                {activeTab === 0 && <form className="tab-content active" id="home" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Date* :</label>
                        <input type="date" name="date" id="date" required value={playdates.date} onChange={(e) => setPlaydates({ ...playdates, date: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="starttime">Start Time* :</label>
                        <input type="starttime" name="starttime" id="starttime" required value={playdates?.startTime
                        } onChange={(e) => setPlaydates({ ...playdates, startTime: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endtime">End Time* :</label>
                        <input type="endtime" name="endtime" id="endtime" required value={playdates.endTime} onChange={(e) => setPlaydates({ ...playdates, endTime: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="visibility">Visibility* :</label>
                        <div className="radio-group">
                            <input type="radio" name="visibility" id="onlyme" value={playdates.visibility} onChange={(e) => setPlaydates({ ...playdates, visibility: false })}
                                checked={playdates.visibility === false} />
                            <label htmlFor="onlyme">Only Me</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="visibility" id="all" value={playdates.visibility} onChange={(e) => setPlaydates({ ...playdates, visibility: true })}
                                checked={playdates.visibility === true} />
                            <label htmlFor="all">All Users</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" id="location" value={playdates.location} onChange={(e) => setPlaydates({ ...playdates, location: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="text" name="age" id="age" value={playdates.age} onChange={(e) => setPlaydates({ ...playdates, age: e.target.value })} />
                    </div>
                    <div className='form-button-wrapper'>
                        <button type="submit" className='button-primary'>Post</button>
                    </div>
                </form>}

                {activeTab === 1 &&
                    <div className='myplaydate-wrapper'>
                        <div className="table-wrapper">
                            <table className="tab-content" id="about" style={updateModal ?
                                { visibility: 'hidden', opacity: '0', } : {}
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
                                            <td className='table-button'><button onClick={() => {
                                                setUpdateModal(true);
                                                setPlaydates(playdate);
                                                setUpdatePlaydate(playdate);
                                            }}>Update</button></td>
                                            <td className='table-button'><button onClick={() => {
                                                setDeleteModal(true)
                                                setUpdatePlaydate(playdate);
                                            }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={updateModal ? "update-modal show" : "update-modal"}>
                            <div className="update-modal-content">

                                <form className="tab-content active" id="update" onSubmit={handleUpdatedForm}>
                                    <span className="close" onClick={() => setUpdateModal(false)}><AiOutlineClose /></span>
                                    <div className='update-form'>
                                        <div className="form-group">
                                            <label htmlFor="date">Date* :</label>
                                            <input type="date" name="date" id="date" required value={updatePlaydate.date} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, date: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="starttime">Start Time* :</label>
                                            <input type="starttime" name="starttime" id="starttime" required value={updatePlaydate?.start_time
                                            } onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, start_time: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endtime">End Time* :</label>
                                            <input type="endtime" name="endtime" id="endtime" required value={updatePlaydate?.end_time} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, end_time: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="visibility">Visibility* :</label>
                                            <div className="radio-group">
                                                <input type="radio" name="visibility" id="onlyme" value={updatePlaydate.visibility} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, visibility: false })}
                                                    checked={updatePlaydate.visibility === false} />
                                                <label htmlFor="onlyme">Only Me</label>
                                            </div>
                                            <div className="radio-group">
                                                <input type="radio" name="visibility" id="all" value={updatePlaydate.visibility} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, visibility: true })}
                                                    checked={updatePlaydate.visibility === true} />
                                                <label htmlFor="all">All Users</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location">Location:</label>
                                            <input type="text" name="location" id="location" value={updatePlaydate.location} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, location: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="age">Age:</label>
                                            <input type="text" name="age" id="age" value={updatePlaydate.age} onChange={(e) => setUpdatePlaydate({ ...updatePlaydate, age: e.target.value })} />
                                        </div>
                                        <div className='buttons-wrapper'>
                                            <button type="button" className='button-primary undo' onClick={handleUndo}>Undo</button>
                                            <button type="submit" className='button-primary'>Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={deleteModal ? "delete-modal show" : "delete-modal"}>
                            <div className="delete-modal-content">
                                <span className="close" onClick={() => setDeleteModal(false)}><AiOutlineClose /></span>
                                <p>Are you sure to delete this playdate ?</p>
                                <div className='delete-modal-buttons-wrapper'>
                                    <button className='delete-modal-button button-primary' onClick={() => setDeleteModal(false)}>Cancel</button>
                                    <button className='delete-modal-button button-primary' onClick={() => {
                                        setDeleteModal(true);
                                        handleDeletePlaydate();
                                    }}>Confirm</button>
                                </div>
                            </div>
                        </div>

                    </div>
                }

                {activeTab === 2 && <div className='all-plays-tab'>
                    <div className="add-button-wrapper">
                        <button onClick={() => setActiveTab(0)} className='button-primary'>Add</button>
                    </div>
                    <div className="table-wrapper table-wrapper-visible">
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



                        </table>
                    </div>
                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default PlaydatesTabs