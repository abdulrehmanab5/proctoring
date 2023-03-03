import React, {useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {facultyLogout} from '../redux/action/facultyAction'



const Home = () => {
    const store = useSelector((store)=>store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.faculty.faculty.faculty.name) {
            setName(store.faculty.faculty.faculty.name)
        }
    }, [store.faculty.faculty.faculty.name])
    const logoutHandler = () => {
        dispatch(facultyLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
            {/* <Header /> */}
            <div className="row">
                <div className="col">
                <nav className="fixed-top navbar navbar-dark navbar-expand-lg" style={{ color:"white !important",backgroundColor:"#003b67", opacity:'0.9'}}>
                        <h4 className="navbar-brand mt-1" href="" style={{color:"white"}}>Proctoring</h4>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <button type="button" className="btn"><Link to="/home"><li style={{color:"white"}}>{name.toUpperCase()}</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/updateProfile"><li style={{color:"white"}}>UPDATE PROFILE</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/attendenceFaculty"><li style={{color:"white"}}>MARK ATTENDANCE</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/uploadMarks"><li style={{color:"white"}}>UPLOAD MARKS</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/uploadPaper"><li style={{color:"white"}}>UPLOAD PAPER</li></Link></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/faculty/updatePassword"><li style={{color:"white"}}>UPDATE PASSWORD</li></Link></button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button style={{listStyle:"None", color:"white"}} onClick={logoutHandler}  type="button" className="btn">< >LOGOUT</></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home
