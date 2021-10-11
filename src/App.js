import './App.css';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser)
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error.message);
    })
  }



  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>:
        <button onClick={handleSignOut}>Sign Out</button>  
    }
      
      
      
       <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know Your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
