// Write your code here
import { Component } from "react";
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from "../AppointmentItem";

import './index.css'

class Appointments extends Component {
    state = {
        appoinmentsList: [],
        isStarFilltered: false,
        title: '',
        date: ''
    }


    onChangeInput = event => {
        const {name, value} = event.target
        this.setState(prevState => ({
            [name]: value
        }))
    }

    onStartMarking = id => {
        this.setState(prevState => ({
            appoinmentsList: prevState.appoinmentsList.map(item => item.id === id ? {...item, isStarred: !item.isStarred} : item)
        }))
    }

    filterByFavourite = () => {
        this.setState(prevState => ({isStarFilltered: !prevState.isStarFilltered}))
    }

    onAddAppointment = event => {
        event.preventDefault()

        const {title, date} = this.state

        const newAppointment = {
            id: uuidv4(),
            title,
            date,
            isStarred: false
        }

        this.setState(prevState => ({
            appoinmentsList: [...prevState.appoinmentsList, newAppointment]
        }))
    }

    render () {
        const {appoinmentsList, isStarFilltered} = this.state

        const filteredAppoinmentsList = appoinmentsList.filter(item => isStarFilltered ? item.isStarred : true)

        return (
            <div className="app-container">
                <div className="appoinments-card">
                    <div className="form-image-container">
                        <form className="form" onSubmit={this.onAddAppointment}>
                            <h1 className="heading">Add Appoinment</h1>
                            <label htmlFor="title">TITLE</label>
                            <input name="title" onChange={this.onChangeInput} placeholder="Title" id="title" className="title-input"/>
                            <label htmlFor="date">DATE</label>
                            <input name="date" onChange={this.onChangeInput} placeholder="dd/mm/yyyy" id="date" type="date" className="date-input"/>
                            <button type="submit" className="add-btn">Add</button>
                        </form>
                        <img className="image" src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointments"/>
                    </div>
                    <hr className="separator"/>
                    <div className="sub-heading-btn-container">
                        <h1 className="appointments-heading">Appointments</h1>
                        <button onClick={this.filterByFavourite} className="starred-btn">Starred</button>
                    </div>
                    <ul className="appoinments-list">
                        {
                            filteredAppoinmentsList.map(eachAppoinment => 
                            <AppointmentItem 
                                key={eachAppoinment.id} 
                                appointmentDetails={eachAppoinment}
                                onStartMarking = {this.onStartMarking}
                            />)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Appointments