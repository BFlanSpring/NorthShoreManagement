import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import HomePage from "../homepage/HomePage";
import LogInForm from "../authentication/LoginForm";
import ProfileForm from "../authentication/ProfileForm";
import SignupForm from "../authentication/SignUpForm";
import DCF from "../financial-analysis/DCF";



function AppRoutes({ login, signup, authenticated, searchResults, fetchStocks}) { 
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );
 
    console.debug('Rendering AppRoutes');

    const ProtectedRoute = ({authenticated, children}) => {
      if (!authenticated) {
        return <Navigate to= "/" replace />
      }
      return children;
    };

    
    return (
      <Routes> 
        {/* unauthorized routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInForm login={login}/>} />
        <Route path="/signup" element={<SignupForm signup={signup}/>} />
        <Route path="/dcf" element={<DCF />} />


      
        {/* authorized routes */}

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute authenticated={authenticated}>
              <ProfileForm/>
            </ProtectedRoute>} />
      </Routes>
    );
}

export default AppRoutes;