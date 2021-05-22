import React from 'react';
import './Send.css'
import Navbar from './Navbar'
import {useState} from 'react'
import './Navbar.css'
import image from './upload.png'
import send from './send-file.jpg'
const Send = () => {
	const [files, setFiles] = useState([])
	const [progress, setProgress] = useState(0)
	const [size, setSize] = useState(5e+6)
	const [uploaded, setUploaded] = useState(false)
	const [url, setUrl] = useState('')
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

	}
	const removeFile = (e) => {
		let target = e.target;
		if(target.tagName.toUpperCase() === "LI") {
			let nodes = Array.from(target.parentNode.children)
			let index = nodes.indexOf(target)
			let curFile = files
			let filesize = curFile.slice(index, index+1)[0].size
			curFile.splice(index+1)
			let oldSize = size
			setSize((parseFloat(oldSize) - parseFloat(filesize)))
			target.parentNode.removeChild(target)
		}
	}
	return (
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
		)
}

export default Send;