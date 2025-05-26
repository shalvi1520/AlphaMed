import React, { useState } from "react";
import { SignedIn } from "@clerk/clerk-react";

function DiagnosticPage() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [precautions, setPrecautions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDiagnosis("");
    setPrecautions([]);

    
    const symptomList = symptoms
      .split(",")
      .map((s) => s.trim().toLowerCase().replace(/ /g, "_"))
      .filter((s) => s.length > 0);

    if (symptomList.length === 0) {
      setError("Please enter at least one valid symptom.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: symptomList }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setDiagnosis(data.disease);
      setPrecautions(data.precautions || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SignedIn>
      <div className="container mt-5">
        <h2>Diagnostic Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="symptoms" className="form-label">
              Enter your symptoms (comma separated)
            </label>
            <input
              type="text"
              id="symptoms"
              className="form-control"
              placeholder="e.g. weakness, neck pain, dizziness"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Diagnose
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3">{error}</div>
        )}

        {diagnosis && (
          <div className="mt-4">
            <h4>Predicted Disease: {diagnosis}</h4>
            <h5>Recommended Precautions:</h5>
            <ul>
              {precautions.map((p, index) => (
                <li key={index}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SignedIn>
  );
}

export default DiagnosticPage;

