import React from "react";
import Headers from "./main/header";
import Body from "./main/body";
import { useAuth0 } from "@auth0/auth0-react";
import MyComponent from "./elements/demoAPIcall";
import EmailDataComponent from './components/UserFocusDateTime'

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("current user logged in", user);

  return (
    <div className="container">
      <Headers />
      {isAuthenticated && <h3>Hello {user.name}</h3>}
      {isAuthenticated && <Body />}
      {isAuthenticated && <MyComponent/>} // testing
      {isAuthenticated && <EmailDataComponent email={user.email}/>}
      {isAuthenticated ? (
        <button onClick={(e) => logout()}>Log Out</button>
      ) : (
        <button onClick={(e) => loginWithRedirect()}>LoginWithRedirect</button>
      )}
    </div>
  );
}

export default App;
