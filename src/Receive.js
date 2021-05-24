import React, {useState} from 'react';
import downloadImg from './download.jpg'
import Navbar from './Navbar'
import './Receive.css'
import receive from './receive.png'
import firebase from './firebase'
const Receive = () => {
	const [progress, setProgress] = useState(0)
	const [files, setFiles] = useState([])
	const [link, setLink] = useState('')
	const download = () => {
	    let curfiles = files 
        let len = curfiles.length;
        let step = (100/len).toFixed(10)
        setProgress(parseFloat(0))
        if(len > 0){
            let i;  
            for(i=0;i<len;i++){
                const storageRef  = firebase.storage().ref();
                var starsRef = storageRef.child(curfiles[i]);
                starsRef.getDownloadURL()
                .then((url) => {
                    let oldval  = progress
                    setProgress(parseFloat(oldval)+parseFloat(step))
                    document.getElementById('input').value = '';
                    console.log(url)
                    setLink(url)
                   let element = document.createElement('a'); 
                   element.setAttribute('href', url); 
                   element.setAttribute('target', "_blank"); 
                //    element.setAttribute('download', filename); 
                   document.body.appendChild(element); 
                   element.click(); 
                   document.body.removeChild(element); 

                }).catch((error) => {
                    console.log(error)
                    document.getElementById("alertRecieve").style.display = "block"
                    document.getElementById("alertRecieve").innerHTML="Unable to Download File"
                    setTimeout(function(){ 
                        document.getElementById("alertRecieve").style.display="none"; 
                    }, 3000);
                });
            }      
        }
	}

	const checkFiles = () => {
	    let text = document.getElementById('input').value
	    console.log(text)
        if (text.length>0){
            console.log('true')
            const storageRef  = firebase.storage().ref();
            var listRef = storageRef.child(text+"/");
            console.log(listRef)
            listRef.listAll().then((res) => {
            	
	            res.items.forEach((itemRef) => {
            		console.log(itemRef)
                    files.push(itemRef._delegate._location.path_)

	            });
            })
            .then(() => {
                if(files.length>0){
                    download()
                }
                else{
                    document.getElementById("alertRecieve").style.display = "block"
                    document.getElementById("alertRecieve").innerHTML="Either the name you Entered is wrong or the item has expired"
                    setTimeout(function(){ 
                        document.getElementById("alertRecieve").style.display="none"; 
                    }, 4000);
                }
            })
            .catch(function(error) {
            	console.log(files)
                document.getElementById("alertRecieve").style.display = "block"
                document.getElementById("alertRecieve").innerHTML="We faced some error while searching for your files please try again!!"
                    setTimeout(function(){ 
                        document.getElementById("alertRecieve").style.display="none"; 
                    }, 4000);
            });
        }
        else{
            document.getElementById("alertRecieve").style.display = "block"
            document.getElementById("alertRecieve").innerHTML="Enter a valid Name"
            setTimeout(function(){ 
                document.getElementById("alertRecieve").style.display="none"; 
            }, 1500);
        }
	}

	const inputHighlight = () => {
		let input = document.getElementById("input");
		input.style.border="none";
		input.style.borderBottom = "1px solid #6125ac";
	}


    return(
    	<div>
    		<Navbar/>
	    <div className="Recieve">
	        <div className="imgPanel">
	            <img src={downloadImg} width={"600px"} alt="sharing file" className="recieveImage"/>
	        </div>
	        <div className="ContentPanel">
	            <div className="contentPanelElements">
	                <img src={receive} width='200px' alt="download symbol" className="downloadImage"/>
	                <progress id="statusIndicator" value={progress} max="100" />
	                <input type="text" placeholder="Enter Download Code" id="input" autoComplete="off" onFocus={inputHighlight}/>
	                <button id="download" onClick={checkFiles}>Download</button>
	            </div>
	        </div>
	        <div color="danger" id="alertRecieve">
	        </div>
	    </div>
	    </div>
	);
}

export default Receive;