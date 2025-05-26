import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from 'react-router-dom';
import { UserButton, useUser } from "@clerk/clerk-react";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import DiagnosticPage from './DiagnosticPage';
import ProtectedPage from './ProtectedPage';
import "./App.css";
import background from "./background.png";

function App() {
  const { isSignedIn } = useUser();
  
  return (
    <div
      className="homepage-background"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      ></div>

      
      <nav className="navbar navbar-light bg-light" style={{ position: "relative", zIndex: 2 }}>
        <div className="container-fluid">
          <span className="navbar-brand">MedLife</span>
          <div>
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
                <Link to="/" className="btn btn-primary ms-2">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="btn btn-outline-primary me-2">Sign in</Link>
                <Link to="/sign-up" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      
      <div
        className="App container text-center"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "10vh",
        }}
      >
        <Routes>
          <Route path="/" element={
            <>
              <h1 style={{ fontWeight: "bold", color: "#007bff" }}>
                Welcome to AlphaMed!
              </h1>
              <h2 style={{ color: "#333" }}>Your Personal AI Health Assistant!</h2>

              
              <div className="mt-5">
                <h3 style={{ color: "#555", marginBottom: "30px" }}>Our Services</h3>
                <div className="row">
                  <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: "#007bff" }}>Symptom Analysis</h5>
                        <p className="card-text">
                          Leverage advanced AI algoithms to analyze symptoms and provide accurate preliminary diagnosis.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: "#007bff"}}>Report Interpretation</h5>
                        <p className="card-text">
                          Upload medical reports and receive detailed,easy to understand interpretations powered by AI.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: "#007bff"}}>Health Recommendations</h5>
                        <p className="card-text">
                          Get personalized health tips and recommendations based on your medical history and current condition.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title" style={{ color: "#007bff"}}>24/7 Virtual Assistance</h5>
                        <p className="card-text">
                          Access round-the-clock virtual assistance for all your healthcare queries and concerns.
                        </p>
                      </div>
                      
                    </div>
                  </div>
                  
                  

                </div>
              </div>
            </>
          } />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route 
            path="/protected" 
            element={
              isSignedIn ? <ProtectedPage /> : <SignInPage afterSignInUrl="/protected" />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;