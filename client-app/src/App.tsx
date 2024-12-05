import React, {useState} from 'react';
import {BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Contact from "./components/contact/Contact";
import Body from "./components/Home/Body";
import AboutUs from "./components/AboutUs/AboutUs";
import Login from "./components/Admin/Login";
import ResetPassword from "./components/Admin/ResetPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ViewMessage from "./components/ViewMessage/ViewMessage";
import Certification from "./components/Certification/Certification";
import Service from "./components/Service/Service";
import Safety from "./components/Safety/Safety";
import CenteredImagePage from "./components/FM112/Image";
import CenteredImageSH80IH35 from "./components/SH80IH35/Image";
import CenteredImageSH82IH35 from "./components/SH82IH35/Image";
import CenteredImageSH95 from "./components/SH95/Image";
import CenteredImageRM3238 from "./components/RM3238/Image";

// @ts-ignore
const ProtectedRoute = ({ token, children }) => {
    return token ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null); // Explicitly type the state as string | null
    // @ts-ignore
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service" element={<Service />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/images" element={<CenteredImagePage />} />
                <Route path="/imagesSH80IH35" element={<CenteredImageSH80IH35 />} />
                <Route path="/imagesSH82IH35" element={<CenteredImageSH82IH35 />} />
                <Route path="/imagesSH95" element={<CenteredImageSH95 />} />
                <Route path="/imagesRM3238" element={<CenteredImageRM3238 />} />
                <Route path="/certification" element={<Certification />} />
                <Route
                    path="/view-message"
                    element={
                        <ProtectedRoute token={token}>
                            <ViewMessage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/admin" element={<Login setToken={setToken} />} />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRoute token={token}>
                            <ResetPassword token={token} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute token={token}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;