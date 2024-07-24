import React, { useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./general/UseLocalStorage";
import NavBar from "./navbar-routes/NavBar";
import AppRoutes from "./navbar-routes/Routes";
import BackendApi from "./api/BackEndAPI";
import UserContext from "./authentication/UserContext";
import LoadUpPage from "./general/LoadUpPage";
import { jwtDecode } from "jwt-decode";
export const TOKEN_STORAGE_ID = "backend-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [showLoadUpPage, setShowLoadUpPage] = useState(true);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );


  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          BackendApi.token = token;
          let currentUser = await BackendApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

 
  async function signup(signupData) {
    try {
      let token = await BackendApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await BackendApi.login(loginData);
      setToken(token);

      let { username } = jwtDecode(token);
      let currentUser = await BackendApi.getCurrentUser(username);

      setCurrentUser(currentUser);
      console.log("Logged in as:", currentUser);
      console.log(token);

      
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  const authenticated = !!token; 

  if (authenticated) {
    console.log(true);
  }

  const handleVideoEnd = () => {
    setShowLoadUpPage(false); // Hide LoadUpPage and show the main content
  };



/* ----------------------------------------------------------------*/


  // return (
  //   <BrowserRouter>
  //     <UserContext.Provider value={{currentUser, setCurrentUser }}>
  //         <div className="App">
  //           <NavBar logout={logout} />
  //           <AppRoutes login={login} 
  //                       signup={signup} 
  //                       authenticated={authenticated} />
  //         </div>
  //     </UserContext.Provider>
  //   </BrowserRouter>
  // );



  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          {showLoadUpPage ? (
            <LoadUpPage onVideoEnd={handleVideoEnd} />
          ) : (
            <>
              <NavBar logout={logout} />
              <AppRoutes login={login} signup={signup} authenticated={authenticated} />
            </>
          )}
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
