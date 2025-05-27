import React from 'react'
import './index.css'
import {Link} from "react-router-dom"
const HomePage = () => {
  return (
    <div className="column">
        <Link to="/create"><button className="create">Create a trip</button></Link>
        <br/>
        <button className="join">Join a trip</button>
    </div>
  )
}

export default HomePage