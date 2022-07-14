import React from "react";
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';
import BackButton from "../images/off_arrow.png";
import Notification from "../images/notification_p.png";
import Bitmap from "../images/Bitmap_res.png";
import Male from "../images/male.png";
import Phone from "../images/Union.png";
import Email from "../images/Message.png";
import Location from "../images/Shape.png";
import Star from "../images/star.png";
import Arrow from "../images/arrow.png";
import Ranking from "../images/ranking.png";
import StarPro from "../images/star_pro.png";
import BottomNavBar from "../Components/BottomNavBar";
import axios from "axios";
import BackgroundYellow from '../images/yellow_bg.png';
//import qs from 'qs'

var client_id = "Hd6pcoTQy5GNYlbzs462bIfNGt9rODNT";
var client_secret = "hG8FvPAh9sJuzMlD";

var grant_type = "client_credentials";
var access_token = "";
var gpdismursse = "https://apigw.grameenphone.com/bulkdata/v2/productOrederingManamgement/productOrder/";
var packitem = {
    "50": 22,
    "250": 48
}

class Profile extends React.Component {


    redeemPointCheck = (e) => {

        var pack = e.target.parentElement.getAttribute("datapack")
        console.log(pack)

        console.log(packitem[pack])

        console.log("redeem point")

        var data = {
            "pack": parseInt(pack),
            "user_points": 1,
            "user_id": parseInt(localStorage.getItem('user_id')),
            "transaction_id": "EZ2C5",
            "packid": packitem[pack]
        }



        axios({
            url: 'https://ilgci0djoh.execute-api.ap-southeast-1.amazonaws.com/staging/verifyRedeemPoints',
            data: data,
            method: 'post',
            //  headers: {
            //      'Authorization': accessToken,
            //   }
        })
            .then((res) => {
                console.log(res);
                alert("You have successfully claimed your reward")
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }

    async componentDidMount() {
        var uservalue = await Auth.currentUserInfo();
        await this.setState({
            ...uservalue,
        });
        //console.log(["username"])





        //profile api call
        axios({
            url: 'https://hepoobz475.execute-api.ap-southeast-1.amazonaws.com/staging/getplayerdetailsbyid',
            params: { user_id: localStorage.getItem('user_id') },
            method: 'get',
            //  headers: {
            //      'Authorization': accessToken,
            //   }
        })
            .then((res) => {
                console.log(res.data);
                // console.log(res.data.email);
                localStorage.setItem('user_address', res.data.location);
                localStorage.setItem('user_phone', res.data.phone);
                localStorage.setItem('user_name', res.data.name);
                //  console.log(localStorage.getItem('user_address'))


                // console.log(accessToken),
                this.setState({
                    //  defaultSurveys: res.data, // show the first 6 objects
                    //  isPending: false
                });
            });


        axios({
            url: 'https://ilgci0djoh.execute-api.ap-southeast-1.amazonaws.com/staging/getPackages',
            params: "",
            method: 'get'
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    data_package: res.data
                })

            });


        axios({
            //url: 'https://ojc37k2avh.execute-api.ap-southeast-1.amazonaws.com/staging/getUserPoints',

            url: 'https://t4tcacthp7.execute-api.ap-southeast-1.amazonaws.com/staging/getPoints',
            params: { user_id: localStorage.getItem('user_id') },
            method: 'get'
        })
            .then((res) => {
                //console.log(res);
                //console.log(res.data[0].current_points);
                //console.log(res.data[0].lifetime_point);
                localStorage.setItem('user_currentPoint', res.data[0].current_point);
                localStorage.setItem('user_lifetimePoint', res.data[0].lifetime_point);

            });






    }


    render() {

        var user = this.state;
        var phoneNumber = localStorage.getItem('user_phone');
        var address = localStorage.getItem('user_address');
        var name = localStorage.getItem('user_name');
        var current_points = localStorage.getItem('user_currentPoint');
        var lifeTime_points = localStorage.getItem('user_lifetimePoint');

        var image = user ? user["attributes"]["picture"] : "";
        var data_package = user ? user["data_package"] ? user["data_package"] : [] : []
        console.log(user)
        //console.log(image)
        // image = localStorage.setItem('user_image')
        //var id = localStorage.getItem('user_id');
        //console.log(id)
        return (
            <div
                style={{

                    height: "100vh",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    overflow: 'hidden auto',
                    backgroundImage: `url(${BackgroundYellow})`,
                }}
            >


                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>

                    <div>
                        <h2 style={{
                            color: '#1B164E',
                            fontFamily: 'Oswald',
                            fontSize: '20px',
                            fontWeight: '600'
                        }}>Profile</h2>
                    </div>

                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '60px',
                        width: '100%',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: '100%',
                    }}>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <div>
                            <img
                                src={image}
                                style={{ height: "150px", borderRadius: "68.5px", borderWidth: '1px', border: 'solid', borderColor: "#1B164E" }}
                                alt=""
                            />
                        </div>
                        <div>
                            <p style={{
                                fontFamily: "Oswald",
                                color: '#1B164E',
                                fontWeight: '700',
                                fontSize: '24px'
                            }}>
                                {localStorage.getItem('user_name')}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link to={'/edit'} >
                            <p style={{
                                fontFamily: "Oswald",
                                color: '#1B164E',
                                fontWeight: '600',
                                fontSize: '18px'
                            }}>
                                Edit Profile
                            </p>
                        </Link>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '400px'
                    }}>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '4px',
                                marginTop: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    backgroundBlendMode: 'luminosity',
                                    padding: '14px 12px 14px 12px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: '8px',
                                    marginRight: '3px',
                                    border: 'solid',
                                    borderColor: '#1B164E',
                                    borderWidth: '2px'
                                    //width:'12vh'
                                }}>

                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    fontSize: '18px',
                                    textAlign: "center",
                                    fontWeight: '600',
                                    marginLeft: '5px',
                                    paddingTop: '5px'
                                }}>{lifeTime_points} Points</span>

                            </div>

                            <div
                                style={{
                                    backgroundColor: 'white',
                                    backgroundBlendMode: 'luminosity',
                                    padding: '14px 12px 14px 12px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: '8px',
                                    border: 'solid',
                                    borderWidth: '2px',
                                    borderColor: '#1B164E'
                                }}>


                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    fontSize: '18px',
                                    textAlign: "center",
                                    fontWeight: '600',
                                    marginLeft: '5px',
                                    paddingTop: '5px',

                                }}>{current_points} Redeemable
                                </span>

                            </div>

                        </div>


                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '4px',
                                marginTop: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    backgroundBlendMode: 'luminosity',
                                    padding: '14px 12px 14px 12px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: '8px',
                                    marginRight: '3px',
                                    border: 'solid',
                                    borderColor: '#1B164E',
                                    borderWidth: '2px'
                                    //width:'12vh'
                                }}>
                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    paddingTop: '16px',
                                    fontSize: '18px',
                                    textAlign: "center",
                                    fontWeight: '600px',

                                }}></span>
                                <div style={{ backgroundColor: '#ECEEF2', borderRadius: '50%', }}>
                                    <img src={Male} style={{ padding: '10px 11px 10px 11px' }} alt=" " />
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: 'white',
                                backgroundBlendMode: 'luminosity',
                                padding: '14px 12px 14px 12px',
                                display: 'flex',
                                flexDirection: 'row',
                                borderRadius: '8px',
                                marginRight: '3px',
                                border: 'solid',
                                borderColor: '#1B164E',
                                borderWidth: '2px'
                            }}>
                               
                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    padding: '10px 3px 10px 3px',
                                    fontSize: '24px',
                                    textAlign: "center",
                                    fontWeight: 'bolder'
                                }}>{phoneNumber ? "+88" + (phoneNumber) : "Not Yet Added"}</span>
                            </div>
                        </div>

                        <div style={{
                            marginBottom: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                               backgroundColor: 'white',
                               backgroundBlendMode: 'luminosity',
                               padding: '14px 12px 14px 12px',
                               display: 'flex',
                               flexDirection: 'row',
                               borderRadius: '8px',
                               marginRight: '3px',
                               border: 'solid',
                               borderColor: '#1B164E',
                               borderWidth: '2px',
                               width:'285px',
                               marginBottom:'5px'
                            }}>
                                
                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    fontSize: '18px',
                                    textAlign: "center",
                                    fontWeight: '600',
                                    paddingLeft: '10px',
                                    paddingRight: '85px',
                                    marginLeft: '2px'
                                }}>{user ? user["attributes"]["email"] : ""}</span>
                            </div>
                            <div style={{
                               
                                backgroundColor: 'white',
                                backgroundBlendMode: 'luminosity',
                                padding: '14px 12px 14px 12px',
                                display: 'flex',
                                flexDirection: 'row',
                                borderRadius: '8px',
                                marginRight: '3px',
                                border: 'solid',
                                borderColor: '#1B164E',
                                borderWidth: '2px',
                                width:'285px'
                            }}>
                               
                                <span style={{
                                    fontFamily: 'Oswald',
                                    color: '#1B164E',
                                    fontSize: '18px',
                                    textAlign: "center",
                                    fontWeight: '600',
                                    paddingLeft: '10px',
                                    paddingRight: '150px'
                                }}>{address ? address : "Not Yet Added"}</span>
                            </div>
                        </div>

                        
                        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                            <a href="mailto:quizkingmobile@gmail.com" style={{
                                fontFamily: "Oswald",
                                color: '#1B164E',
                                fontWeight: '500',
                                fontSize: '16px',
                                textDecoration: 'none'
                            }}>Send FeedBack</a>
                        </div>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <p>.</p>

                        </div>





                        {
                            // <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px' }}>
                            //     <div style={{ backgroundColor: '#F5F5F54D', backgroundBlendMode: 'luminosity', padding: '5px', display: 'flex', flexDirection: 'row', borderRadius: '8px', marginRight: '2px', width: '150px' }}>
                            //         <span style={{ fontFamily: 'Poppins', color: 'white', paddingTop: '10px', fontSize: '16px', textAlign: "center", fontWeight: '600px' }}>50MB 3 Days</span>
                            //         <div style={{ backgroundColor: '#ECEEF2', borderRadius: '50%', }}>

                            //         </div>
                            //     </div>
                            //     <div style={{ backgroundColor: '#FF565E', backgroundBlendMode: 'luminosity', padding: '5px', display: 'flex', flexDirection: 'row', borderRadius: '8px', marginLeft: '2px', Maxwidth: '100px' }}>
                            //         <img src={Star} style={{ width: '20px', height: '22px', marginTop: '7px' }} alt=" " />
                            //         <span style={{ fontFamily: 'Poppins', color: 'white', padding: '10px', fontSize: '13px', textAlign: "center", fontWeight: 'bolder' }}>100 points Claim</span>
                            //         <img src={Arrow} style={{ width: '20px', height: '24px', marginTop: '5px' }} alt=" " />
                            //     </div>
                            // </div>

                        }

                    </div>

                </div>
                <div>
                    <BottomNavBar name='profile' />
                </div>


            </div>



        );
    }
}
export default Profile;