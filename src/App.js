import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import QuestionList from './Components/QuestionList';
import axios from 'axios';

//import Verify from './Screens/Verify';
import terms from './Components/terms';
import NotFound from './Screens/NotFound';
import Complete from './Components/Files/Complete';


Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: 'ap-southeast-1:91c08259-eef7-4e02-a31c-399306005296',
    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_BROESngKb',
    userPoolWebClientId: '24ovjdmj3ucohskfcvvi2s1mib', //24ovjdmj3ucohskfcvvi2s1mib(mukta) //7cmqqu0a0qna1ln2qu3ag54k0s
    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "auth.cleinsight.com",
      scope: [
        "phone",
        "openid",
        "email",
        "profile",
        "aws.cognito.signin.user.admin"
      ],

      //redirectSignIn: "https://mukta-feedback.web.app",
      //redirectSignOut: "https://mukta-feedback.web.app",
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",

      responseType: "code"
    }
  }
})//import Nouislider from './component/Slider';


var IP_Address
const res = axios.get('https://geolocation-db.com/json/')

  .then((res) => {

    IP_Address = res.data.IPv4
    localStorage.setItem('IP_ADDRESS', IP_Address);
  })
// console.log(res.data);



class MainComponent extends React.Component {
  state = { user: null, customState: null, userLogin: false };
  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    });



    Auth.currentAuthenticatedUser()
      .then(user => {
        //console.log(user)
        this.onAuthStateChanged(user)

        this.setState(
          {
            user,
            "userLogin": true
          }
        )
      }
      )
      .catch(() => console.log("Not signed in"));
  }


  onAuthStateChanged = (user) => { //check if the user is present iin database
    console.log(user)
    const getUserDataURL = "https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/getPlayerDetails";
    const postUserDataURL = "https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/storePlayerDetails";


    var image = "";
    var email = (user.attributes.email).toString();
    //var user_id;

    var bodyData = {
      "name": user.attributes.name,
      "email": user.attributes.email,
      "phone": "",
      // "birth_date": birthday[10]+"-"+birthday[12]+"-"+birthday[14],
      "gender": "",
      "profession": "",
      "income": "",
      "hobbies": "",
      "password": "",
      "promo_code": "",
      "promo_verify": 0,
      "referral_code": "",
      "location": "",
      "total_amount": "",
      "current_amount": "",
      "is_active": 1,
      "image": image,
    }
    var config = {
      'Authorization': 'Bearer ' + user.signInUserSession.idToken.jwtToken,
      'Content-Type': 'application/json'
    }
    axios.get(getUserDataURL, {
      params: {
        email: email
      },
      headers: config
    }).then(response => {
      if (response.data === "") {
        axios.post(postUserDataURL, bodyData, {
          headers: config
        }).then(response => {
          console.log("posted")
        })
          .catch(error => {
          });
        axios.get(getUserDataURL, {
          params: {
            email: email
          },
          headers: config
        }).then(response => {

        })
          .catch(error => {
          });
      } else {
        console.log(response);
        console.log(response.data.id);
        localStorage.setItem('user_id', response.data.id);
        console.log("already")
        localStorage.setItem('access_token', user['signInUserSession']['accessToken']['jwtToken']);
      }
    })
      .catch(error => {
      });


  };
  render() {
    const { user } = this.state;








    return (
      <div>
        <div className="App">
          <Switch>
            <Route exact path='/feedback/:id' component={QuestionList} />
            <Route path='/terms' component={terms} />
            <Route path='/congratulation' component={Complete} />
            <Route component={NotFound} />
            {/* <Route path ='/google4d5714c76b8084a6.html' component={Verify} /> */}
          </Switch>

          {/* <button onClick={() => Auth.signOut()}>Sign Out {user["username"]}</button> */}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <BrowserRouter>
      <MainComponent />
    </BrowserRouter>
  );
}
export default App;