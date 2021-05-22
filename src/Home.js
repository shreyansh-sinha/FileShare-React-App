import image from './image.jpg'
import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar'
import './app.css'
function Home() {

    const [send, setSend] = useState(false)
    const [receive, setReceive] = useState(false)

    let history = useHistory();

    const sendRedirect = () => {
        console.log("hello from send")
        history.push('/Send')
        setSend(true)
    }

    const receiveRedirect = () => {
        console.log("hello from receive")
        history.push('/Receive')
        setReceive(true)
    }

return (
        <div>
            <Navbar/>
            <div className="MainContainer">
                
                <div className="centralPanel">
                    <div className="panelContent">
                        <h1>Swiftshare.</h1>
                        <p >It is a file sharing app which allows you to <br/> 
                        upload and share a file from your pc or <br/>
                        mobile and transfer it to anyone across <br/>
                        the internet quickly and easily.</p>
                        <div className="lead">
                            <div className="Selection">
                                <button id="send" className="button" onClick = {sendRedirect}>
                                    Send File
                                </button> <br/>
                                <button id="recieve" className="button" onClick = {receiveRedirect}>
                                    Download File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'imgPanel'>
                    <img src={image} alt="sharing file" className="landingImage"/>
                </div>
            </div>
        </div>
    );
}


export default Home;
