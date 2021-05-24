import React from 'react'
import {useState} from 'react'
import Navbar from './Navbar'
import result from './result.jpg'
import './Result.css'
// import shareImg from './share.png'
const Result = ({url}) => {
	console.log(url)
	// const [URL, setURL] = useState(url)

	const copy = () => {
		// console.log(url)
		let url = document.getElementById('copy').value;
        navigator.clipboard.writeText(url);
        // console.table("copied");
        let alert = document.getElementById("alertResult")
        alert.style.display = "block"
        alert.innerHTML="copied"
        setTimeout(function(){ 
            alert.style.display="none"; 
        }, 1000);
	}
	return (
			<div>
				<Navbar/>
				<div className = "Result">
				<div className="textbox">
					<input type="text" readOnly={true} id="copy" value={url} />
					
				</div>
				<p style={{width:"80%",textAlign:"center",marginTop:"20px"}}><u>Note</u>:  Directly enter the code in the downloads section to Download Your Files</p>
				<button onClick={copy} className="CopyButton" style={{outline:"none"}}>Copy</button>
				<img alt='file transfer sucessful' src={result} width={"400px"}/>
				<div color="success" id="alertResult">
				</div>
				</div>	
			</div>
		)
}

export default Result;