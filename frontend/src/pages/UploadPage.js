import React, { useState } from "react";
import axios from "axios";
import  "./UploadPage.css";
const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];


        // Validate file type
        if (file && !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            setSelectedFile(null);
            return;
        }

        // Validate file size (limit to 5MB)
        if (file && file.size > 5 * 1024 * 1024) {
            setError("File size should not exceed 5MB.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setResult(null); // Reset result
        setError(null);  // Reset error
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("No file selected. Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        setIsLoading(true); // Show loading indicator
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setResult(response.data); // Set the prediction result
        } catch (err) {
            console.error("Error uploading file:", err);
            setError("Failed to upload image or get prediction.");
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    return (

        <div className="upload-container">

        <div style={{ padding: "20px", textAlign: "center",fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "" , fontSize:"50px"}}>Cattle Disease Detection</h1>

            <p style={{ marginBottom: "20px", fontSize:"20px", color: "orange" }}>
                Upload an image of your cattle to detect possible diseases.
            </p>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "15px" }}
            />
            <br />
            <button
                onClick={handleUpload}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border:"none",
                    borderRadius: "15px",
                    width:"200px"
                }}
            >
                {isLoading ? "Processing..." : "Upload and Predict"}
            </button>
            <div style={{border:"2px solid black",marginTop:"40px",backgroundColor:"white",filter:"contrast(80%)"}}>
            {result && (
                <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "500px", margin: "0 auto" ,color:"black"}}>
                    <h3>Prediction Result:</h3>
                    <p><strong>Disease:</strong> {result.disease}</p>
                    <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
                    <p><strong>Remedy:</strong> {result.remedy}</p>
                </div>
               
            )}
            </div>
            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default UploadPage;