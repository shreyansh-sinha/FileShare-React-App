import React from 'react';
import './Send.css'
import Navbar from './Navbar'
import {useState} from 'react'
import './Navbar.css'
import image from './upload.png'
import send from './send-file.jpg'
import Result from './Result'
import firebase from './firebase'


const Send = () => {
	const [files, setFiles] = useState([])
	const [progress, setProgress] = useState(0)
	const [size, setSize] = useState(5e+6)
	const [uploaded, setUploaded] = useState(false)
	const [url, setUrl] = useState('')

	const random = () => {
		var result = '';
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        result += String(Math.floor(Math.random() * 100) + 1);
        for (var i = 10; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        result += String(Math.floor(Math.random() * 100) + 1);
        console.log(result);
        return result;
	}

	const filepick = () => {
		let input = document.createElement('input')
		input.type = 'file'
		input.multiple = 'multiple'
		console.log(input)
		input.onchange = (e) => {
			var uploadedFiles = e.target.files
			// console.log(uploadedFiles)
			for(let i=0;i<uploadedFiles.length;i++) {
				let oldVal = size;
				let fileSize = uploadedFiles[i].size
				console.log(oldVal - fileSize)
				if(oldVal - fileSize >= 0 && uploadedFiles.length < 5) {
					files.push(uploadedFiles[i])
					setSize((parseFloat(oldVal) - parseFloat(fileSize)))
					let list = document.createElement('LI')
					let node = document.createTextNode(String(uploadedFiles[i].name) + String("......") + String((uploadedFiles[i].size/(1e+6)).toFixed(2) + "MB)"))
					list.append(node)
					document.getElementById("filedisplaylist").appendChild(list)
				}
				else {
					document.getElementById("alert").style.display = "block"
					document.getElementById("alert").innerHTML = "File Size increased 5 MB limit!!"
					setTimeout(() => {
						document.getElementById("alert").style.display = "none"
					}, 2000)
				}

			}
		}
		input.click();
	}
	const upload = () => {
		let len = files.length
		console.log(len)
		if(len === 0) {
			try {
				document.getElementById("alert").style.display = "block"
				document.getElementById("alert").innerHTML = "Please select atleast one file!!"
				setTimeout(() => {
					document.getElementById("alert").style.display = "none"
				}, 1000)
			}
			catch(err) {
				console.log(err)
			}
		}
		else {
				try{
                console.log("uploading file ");
                const storageRef  = firebase.storage().ref();
                let folderName = random();
                for(let i of files){
                    setProgress(parseFloat(0))
                    const fileToUpload = storageRef.child(folderName+'/'+i.name);
                    let uploadTask = fileToUpload.put(i);
                    console.log(uploadTask)
                    uploadTask.then(snapshot => {
                        console.log('File Uploaded Successfully');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                document.getElementById("alert").style.display = "block"
                                document.getElementById("alert").innerHTML="Sorry, we are facing some problem from PAUSED!!"
                                setTimeout(function(){ 
                                    document.getElementById("alert").style.display="none"; 
                                }, 1000);
                              	break;
                            case firebase.storage.TaskState.RUNNING:
                                document.getElementById("alert").style.display = "block";
                                document.getElementById("alert").setAttribute = ("color","primary");
                                document.getElementById("alert").innerHTML="Sorry, we are facing some problem from RUNNING!!"
                                setTimeout(function(){ 
                                    document.getElementById("alert").style.display="none"; 
                                }, 1000);
                              	break;
                            default: 
                            	break;
                          }
                    });
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        snapshot => {
                        	console.log('I am here')
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setProgress(parseFloat(progress))
                        }, 
                        error => { 
                            document.getElementById("alert").style.display = "block"
                            document.getElementById("alert").innerHTML="Sorry, we are facing some problem from here!!"
                            setTimeout(function(){ 
                                document.getElementById("alert").style.display="none"; 
                            }, 3000);
                        },()=>{
                            files.shift();
                            if(files.length === 0){
                            	setUploaded(true)
                            	setUrl(folderName)
                            }
                        }
                    );
                }    
            }  
            catch(err){
                document.getElementById("alert").style.display = "block"
                document.getElementById("alert").innerHTML="Sorry, we are facing some problem!!"
                setTimeout(function(){ 
                    document.getElementById("alert").style.display="none"; 
                }, 1000);
            }
            var list = document.getElementById("filedisplaylist");
            var child = list.lastElementChild;  
            while (child) { 
                list.removeChild(child); 
                child = list.lastElementChild; 
            } 
		}
	}

	const removeFile = (e) => {
		let target = e.target;
		if(target.tagName.toUpperCase() === "LI") {
			let nodes = Array.from(target.parentNode.children)
			// console.log(nodes)
			let index = nodes.indexOf(target)
			// console.log(index)
			let uploadedFiles = files
			let fileSize = uploadedFiles.slice(index, index+1)[0].size
			// console.log(fileSize)
			uploadedFiles.splice(index, 1)
			console.log(uploadedFiles)
			let oldSize = size
			// console.log(oldSize)
			console.log(parseFloat(oldSize) + parseFloat(fileSize))
			setSize(parseFloat(oldSize) + parseFloat(fileSize))
			setFiles(uploadedFiles)
			console.log(size)
			target.parentNode.removeChild(target)

		}
	}

	return (
		<div>

			{uploaded === false ?
				<div>
				<Navbar/> 
				<div className="Send">
				    <div className="imgpanel">
				        <img src={send} width={"650px"} alt="sharing file" className="sendImage"/>
				    </div>
				    <div className="filePicker" >
				        <div className="filePicker-content">
				            <img src={image} width="100px" alt="Symbol of addition" onClick={filepick}/>
				            <h5>Add Files</h5>
				            <button id="upload" onClick={upload}>Upload</button>
				            <progress id="statusIndicatorSend" value={progress} max="100" />
				            <div className='filedisplay'> 
				                <h5>Add more files</h5>
				                <p style={{borderBottom:'1px solid grey',marginBottom:'0'}}>{files.length} files added - {(size/1e+6).toFixed(2)} MB remaining </p>
				                <p style={{fontSize:'12px'}}>click to remove files</p>
				                <ul id="filedisplaylist" style={{marginTop:"20px"}} onClick={removeFile}>
				                </ul>
				            </div>
				        </div>
				    </div>
				    <div color="danger" id="alert">
				    </div>
				</div>
				</div>
				:
				<Result url = {url}/>
			}

		</div>	

	)
}

export default Send;