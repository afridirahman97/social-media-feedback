import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackButton from "../images/CTA Small_Icon.png";
import Notification from "../images/off_arrow.png";
import axios from "axios";
import "./Edit.css";
import BackgroundYellow from '../images/yellow_bg.png';


function Edit() {
    // const userImage = localStorage.getItem('user_image');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    // const [id, setId ] = useState ( User_id );
    var player_id = localStorage.getItem('user_id');
    console.log(player_id);

    const handleSubmit = (e) => {
        // e.preventDefault();
        const profile = {
            name,
            phone,
            location,
            player_id
        };

        setIsPending(true);

        axios
            .put('https://xc4kto1wz7.execute-api.ap-southeast-1.amazonaws.com/staging/updateuserdetails', profile)
            .then((res) => {
                console.log(res);
                console.log((profile));
                console.log('User Profile Added');
                setIsPending(false);
                history.go(-1);
                //console.log(res)
            })
    }

    function goBack() {
        history.push('/user')
    }

    return (

        <div
            style={{
                backgroundColor: '#F6F7FA',
                height: "120vh",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${BackgroundYellow})`,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>
                <div>
                    <img src={BackButton} onClick={goBack} style={{ height: '30px' }} alt='' />
                </div>
                <div>
                    <h2 style={{ color: '#1B164E', fontFamily: 'Oswald', fontSize: '20px', fontWeight: '600' }}>Edit Profile</h2>
                </div>
                <div>
                    <img src={Notification} style={{ height: '20px', width: '16px' }} alt='' />
                </div>
            </div>



            <div className="create">
                <h2 style={{ color: '#1B164E', fontFamily: 'Oswald', fontSize: '22px', fontWeight: '500', marginTop: '30px', padding: '15px' }}>Complete your Profile to win MORE POINTS!</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <label style={{ color: '#1B164E', fontFamily: 'Oswald', fontSize: '20px' }}>Name:</label>
                        <input
                            style={{
                                border: 'solid',
                                borderWidth: '1px',
                                borderColor: '#1B164E',
                                borderRadius: '10px'

                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label style={{ color: '#1B164E', fontFamily: 'Oswald', fontSize: '20px' }}>Phone:</label>
                        <input
                            style={{
                                border: 'solid',
                                borderWidth: '1px',
                                borderColor: '#1B164E',
                                borderRadius: '10px'

                            }}
                            type="tel"
                            validators={['isNumber', 'maxNumber:11']}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label style={{color: '#1B164E', fontFamily: 'Oswald', fontSize: '20px' }}>Address:</label>
                        <textarea
                            style={{
                                border: 'solid',
                                borderWidth: '1px',
                                borderColor: '#1B164E',
                                borderRadius: '10px'

                            }}
                            placeholder='Your address'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        ></textarea>
                    </div>

                    <div style={{
                        alignItems: "center",
                        // position: "absolute",
                        // bottom: 0,
                        width: "100%",
                        height: "80px",
                        borderTopLeftRadius: "32px",
                        borderTopRightRadius: "32px",
                        justifyContent: "center",
                        paddingLeft: "70px",
                        paddingRight: "70px",
                        // backgroundImage: `url(${Footer})`,
                        //backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        
                        flexDirection: 'column'
                    }}>
                       
                    

                        {!isPending && <button style={{
                            textAlign: 'center',
                            backgroundColor: '#1B164E',
                            padding: '11px',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            //boxShadow: `1px 1px 1px black`,
                            color: 'white',
                            fontFamily: 'Oswald',
                            width: '180px'
                        }}>Update</button>}

                        {isPending && <button disabled style={{
                            textAlign: 'center',
                            backgroundColor: '#FFFFFF',
                            padding: '11px',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            boxShadow: `1px 1px 1px black`,
                            color: '#124589',
                            fontFamily: 'Oswald',
                            width: '180px'
                        }}>Updating...</button>}
                    </div>

                </form>

            </div>


        </div>
    );
}

export default Edit;