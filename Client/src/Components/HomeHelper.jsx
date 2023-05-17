import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { studentLogout} from '../redux/action/studentAction'


const Home = () => {
    const history = useHistory()
    const store = useSelector((store) => store)
    const [name, setName] = useState("")
    useEffect(() => {
        if (store.student.student.student.name) {
            setName(store.student.student.student.name)
        }
    }, [store.student.student.student.name])
    const dispatch = useDispatch()
   
    const logoutHandler = () => {
        dispatch(studentLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
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
                                    <button type="button" className="btn"><Link to="/student/updateProfile"><li style={{color:"white"}}>UPDATE PROFILE</li></Link></button>
                                </li>
                                <li className="nav-item dropdown" style={{color:"white"}}>
                                    <a style={{color:"white"}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ACADEMIC </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/student/testPerformance">Test Performance</Link>
                                        <Link className="dropdown-item" to="/student/attendence">Attendance</Link>
                                        <Link className="dropdown-item" to="/student/getAllSubjects">Student Subject List</Link>
                                    </div>
                                </li>
                                <li className="nav-item" >
                                    <button type="button" className="btn"><Link to="/Servicepre"><li style={{color:"white"}}>Services</li></Link></button>
                                </li>
                                <li className="nav-item" >
                                    <button type="button" className="btn"><Link to="/student/paperuploaded"><li style={{color:"white"}}>Paper</li></Link></button>
                                </li>
                              
                                <li className="nav-item">
                                    <button type="button" className="btn"><Link to="/student/updatePassword"><li style={{color:"white"}}>UPDATE PASSWORD</li></Link></button>
                                </li>
                               
                            </ul>
                           
                        </div>
                        <div>
                            <button style={{listStyle:"none"}} onClick={logoutHandler} type="button" className="btn"><li style={{color:"white"}}>LOGOUT</li></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home
