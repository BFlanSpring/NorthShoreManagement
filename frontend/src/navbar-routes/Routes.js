import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import HomePage from "../homepage/HomePage";
import LogInForm from "../authentication/LoginForm";
import ProfileForm from "../authentication/ProfileForm";
import SignupForm from "../authentication/SignUpForm";
import DCF from "../financial-analysis/DCF";
import StockPriceFetcher from "../financial-analysis/StockPriceFetcher";
import ForexDataFetcher from "../financial-analysis/ForexDataFetcher";

function AppRoutes({ login, signup, authenticated, searchResults, fetchStocks, scrapeAndProcess }) { 
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof signup}`,
    );

    console.debug('Rendering AppRoutes');

    const ProtectedRoute = ({ authenticated, children }) => {
        if (!authenticated) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    return (
        <Routes>
            {/* Unauthorized routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/dcf" element={<DCF />} />
            <Route path="/stock-price" element={<StockPriceFetcher />} /> {/* Add this route */}
            <Route path="/forex" element={<ForexDataFetcher/>} />
            {/* Authorized routes */}
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute authenticated={authenticated}>
                        <ProfileForm/>
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
}

export default AppRoutes;
