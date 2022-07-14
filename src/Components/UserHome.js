import React from "react";
import User from "../images/user.png";
import BackgroundYellow from "../images/yellow_bg.png";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Button } from "react-bootstrap";
class UserHome extends React.Component {
  async componentDidMount() {
    var uservalue = await Auth.currentUserInfo();
    await this.setState({
      ...uservalue,
    });
    //console.log(["username"])
  }
  render() {
    var user = this.state;
    var image = user ? user["attributes"]["picture"] : "";
    return (
      <div
        style={{
          backgroundImage: `url(${BackgroundYellow})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <div>
            <img
              src={image}
              style={{ height: "150px", borderRadius: "20px" }}
              alt=""
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            paddingLeft: "20px",
          }}
        >
          <p style={{ fontFamily: "Oswald" }}>
            Name : {user ? user["attributes"]["name"] : ""}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            paddingLeft: "20px",
          }}
        >
          <p style={{ fontFamily: "Oswald" }}>
            Email : {user ? user["attributes"]["email"] : ""}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            paddingLeft: "20px",
          }}
        >
          <p style={{ fontFamily: "Oswald" }}>Balance from Quiz : 10.00 Taka</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            paddingLeft: "20px",
          }}
        >
          <p style={{ fontFamily: "Oswald" }}>
            Balance from Survey : 10.00 Taka
          </p>
        </div>
        <Button
          style={{ BackgroundColor: "blue" }}
          onClick={() => Auth.signOut()}
        >
          Sign Out
        </Button>
        <div style={{ padding:"20px"}}>
        <div>
          <p style={{ fontFamily: "Oswald" }}>Cashout Survey Prize Money</p>
          </div>
          <div>
            <input type="numeric" placeholder="Minimum Amount 100 Taka"></input>
          </div>
          <div>
          <p style={{ fontFamily: "Oswald" }}>Choose Payment Option</p>
          </div>
          <div style={{ padding:"20px"}}>
            <input type="radio" ></input> Bkash {' '}
            <input type="radio" ></input> Nagad
            
          </div>
          <Button onClick={()=> alert('Your Balance is less than 100 taka')}>Redeem</Button>
        </div>
      </div>
    );
  }
}
export default UserHome;