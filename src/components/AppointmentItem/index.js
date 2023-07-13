// Write your code here
import {format} from 'date-fns';
import './index.css'

const AppointmentItem = props => {
    const {appointmentDetails: {id, title, date, isStarred}, onStartMarking} = props

    const starImgUrl = `https://assets.ccbp.in/frontend/react-js/appointments-app/${isStarred ? 'filled-star' : 'star'}-img.png`
    const formattedDateString = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const onClickHandle = () => {
        onStartMarking(id)
    }

    return (
        <li className='appointment-conatiner'>
            <div>
                <h1>{title}</h1>
                <p>{formattedDateString}</p>
            </div>
            <button onClick={onClickHandle} data-testid="star" className='start-button'>
                <img className='star' alt='star' src={starImgUrl}/>
            </button>
        </li>
    )
}

export default AppointmentItem