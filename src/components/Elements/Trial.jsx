import React, { useState } from "react";
import "./Trial.scss";

const Trial = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionType, setPredictionType] = useState("real_vs_fake");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prediction_type", predictionType);

    try {
      const response = await fetch("https://faryalnimra-newfake.hf.space/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data);
      setResult(data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const spinningAnimation = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const loaderContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: "50px",
  };

  const spinnerStyle = {
    border: "12px solid #e0e0e0",
    borderTop: "12px solid #00bcd4",
    borderRight: "12px solid #ff4081",
    borderBottom: "12px solid #7e57c2",
    borderRadius: "50%",
    width: "140px",
    height: "140px",
    animation: "spin 1s linear infinite",
    margin: "20px",
  };

  const dragDropZoneStyle = {
    background: file ? "linear-gradient(45deg, #8e9eab, #c7e4e8)" : "#ffffff",
    border: "2px dashed #aaa",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  };

  const loadingTextStyle = {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  };

  return (
    <div className="trial-container">
      <style>{spinningAnimation}</style>

      <div className="trial-content">
        <div className="left-section">
          <h1 className="trial-heading">Image Forgery Detection</h1>
          <p className="trial-paragraph">Upload an image and choose detection type:</p>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="prediction-type" style={{ fontWeight: "bold" }}>
              Prediction Type:
            </label>
            <select
              id="prediction-type"
              value={predictionType}
              onChange={(e) => setPredictionType(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #aaa",
              }}
            >
              <option value="real_vs_fake">Real vs Fake</option>
              <option value="deepfake_vs_cheapfake">Deepfake vs Cheapfake</option>
            </select>
          </div>

          <div
            className="drag-drop-zone"
            style={dragDropZoneStyle}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p>Drag & Drop your image here</p>
            <p>or</p>
            <label htmlFor="file-upload" className="file-upload-label">
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="trial-file-upload"
              onChange={handleFileChange}
            />
          </div>

          <button className="trial-upload-btn" onClick={handleUpload}>
            Detect Forgery
          </button>
        </div>

        <div className="right-section">
          {loading ? (
            <div style={loaderContainerStyle}>
              <div style={spinnerStyle}></div>
              <div style={loadingTextStyle}>Please wait while your image is uploading...</div>
            </div>
          ) : !file ? (
            <div className="video-preview">
              <video width="100%" height="100%" controls autoPlay muted loop>
                <source src="/assets/trevor_sesli.webm" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p
                className="demo-text"
                style={{ color: "red", fontSize: "20px", marginTop: "5px" }}
              >
                Use this demo video to understand how deepfake works.
              </p>
            </div>
          ) : (
            result && (
              <div
                className="trial-result"
                style={{
                  opacity: result ? 1 : 0,
                  background: "linear-gradient(45deg, #ff9e50, #fbc2d5)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  transform: "translateY(-30px)",
                  animation: "slideIn 0.5s ease-out forwards",
                }}
              >
                <div
                  className="result-heading"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  Detection Result
                </div>
                <div className="result-details" style={{ fontSize: "1rem", color: "#f1f1f1" }}>
                  {predictionType === "real_vs_fake" ? (
                    <>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          {result.prediction || "N/A"}
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Fake Type:</strong>{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          {result.fake_type}
                        </span>
                      </p>
                      <p>
                        <strong>Deepfake Confidence:</strong>{" "}
                        {Math.min(parseFloat(result.deepfake_confidence_adjusted), 99.5).toFixed(2)}%
                      </p>
                      <p>
                        <strong>Cheapfake Confidence:</strong> {result.cheapfake_confidence_adjusted}
                      </p>
                      <p>
                        <strong>Faces Detected:</strong>{" "}
                        {result.faces_detected !== undefined ? result.faces_detected : "No data"}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>View More:</strong>{" "}
                    <a
                      href="/assets/Deepfakes_vs_Cheapfakes_Guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "yellow", textDecoration: "underline" }}
                    >
                      Click on link
                    </a>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Trial;
