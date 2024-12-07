import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
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
import ImageView from "./components/ImageView/Image";

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
                <Route path="/images/:id" element={<ImageView />} />
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