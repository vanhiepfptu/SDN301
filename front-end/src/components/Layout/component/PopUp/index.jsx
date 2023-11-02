import './PopUp.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function PopUp(){
    return (
        <section className='popUp'>
            <span className="overlay"></span>

            <div className="modal-box">
                <CheckCircleOutlineIcon className='checkIcon'/>
                <h2>Completed</h2>
                <h3>You have successfully download</h3>

                <div className="buttons">
                    <button className="close-btn">Ok, Close</button>
                    <button className="open-btn">Open</button>
                </div>
            </div>
        </section>
    )
}

export default PopUp