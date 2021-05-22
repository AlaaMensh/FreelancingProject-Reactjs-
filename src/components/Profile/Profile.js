import { Grid } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
// import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import React, { useEffect } from 'react';
import ChangePassword from './CPassword';
import './profile.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';



export default function Profile(props)
{
    const[file,setFile] = React.useState(null)
    const[user,setUser] = React.useState(null)
    const[img,setImg] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    //get the logged in user id
    var userId = localStorage.getItem("userId");

      //handle Modal Open
    const handleOpen = () => {
        setOpen(true);
      };
      //handle Modal CLose
      const handleClose = () => {
        setOpen(false);
      };
      
      //Update Photo function
    const updatePhoto = ()=>{
        let data = new FormData();
        if(!file)
        {
            return;
        }
        data.append('image',file)
        data.append('userId',userId)
        // axios.post('http://localhost:3000/profile/photo',data).then(result=>{

         axios.post('http://localhost:3000/authenticate/update_phote',data).then(result=>{
             console.log(result.data)
            setImg("http://localhost:3000/images/"+result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    //get user on first load
    useEffect(async()=>{
        await getUser()
    },[])

    //function to retrieve the user data with userId
    const getUser = ()=>{
        // axios.get('http://localhost:3000/profile/user/'+userId).then(result=>{

        axios.get('http://localhost:3000/authenticate/update_phote/user/'+userId).then(result=>{
            console.log("result :   ",result)
            setUser(result.data)
            setImg("http://localhost:3000/images/"+result.data.image)
            console.log(img)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    //update photo in case the file path changed
    useEffect(() => {
        updatePhoto()

    }, [file]);

    //set file path after select
    const fileChangedHandler = (event) => {
        setFile(event.target.files[0])

        }

    return (
        
        <div className="container-fluid" style={{position:'absolute',marginTop:25}} >
            {/* Box Start */}
            <Row className="justify-content-center">
                <Col>
                <div className="main-box">
            {/* Upoad Button Start */}
            <input accept="image/*"  style={{display:"none"}} id="icon-button-file" type="file" onChange={fileChangedHandler}/>
            <label htmlFor="icon-button-file">
            <IconButton   aria-label="upload picture" component="span" style={{position:"relative" , top : "6em" , left:"5em" , zIndex : "2" , padding:"0.2em 0em" , backgroundColor:"var( --main-color-btn-navbar-hover)"}}>
            {/* <PhotoCamera /> */}
            <EditIcon />
            </IconButton>
            </label>
            {/* Upload Button End */}

            {/* Cover Start */}
            <img className="cover" id="blah" src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=800&q=100"/>

            {/* Profile Image Start */}
            <div className="dp-container"><img className="dp" src={img || "https://th.bing.com/th/id/R31cdf1469f1cc2afc4e04eb8272f4e41?rik=dAm4vg9TMSL8JA&riu=http%3a%2f%2ffsi-hlscc.com%2fimages%2fanonteammenberlg.png&ehk=ih3kR6k4stJt1FWcsRIKgY95DTxm4SpuNddgk8y75vk%3d&risl=&pid=ImgRaw"}/></div>


            {/* User Data Start */}
            <div className="row  ">
            
                <div className="col-6 ">
                <h5 className="profile-h3">User Name : {user != null && user.userName}</h5>

                </div>
                <div className="col-6"> 
                <h5 className="profile-h3">Email : {user != null && user.email}</h5>
                </div>

            </div>
            <div className="row">
            
            <div className="col-6 ">
            <h5 className="profile-h3">User Full Name : {user != null && user.firstName} {user != null && user.secondName} {user != null && user.lastName}</h5>

            </div>
            <div className="col-6"> 
            <h5 className="profile-h3">Phone : {user != null && user.phone}</h5>
            </div>

            </div>
            <div className="row  ">
            
                <div className="col-6 ">
                <h5 className="profile-h3"> Address: {user != null && user.address}</h5>

                </div>
                <div className="col-6"> 
                <h5 className="profile-h3">Marital Status : {user != null && user.maritalStatus}</h5>
                </div>

            </div>


            <button className="but" onClick={()=>handleOpen()}>Change Password</button>
              
        </div>
                </Col>
            </Row>
            <Modal show={open} onHide={handleClose} style={{marginTop:"3em"}}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <ChangePassword modalClose={handleClose} userId={userId}/>
                </div>
                </Modal.Body>
               
            </Modal>
            
      </div>
    
    )
}