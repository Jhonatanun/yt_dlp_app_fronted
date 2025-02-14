import { useState } from "react";
import axios from "axios";

function App() {
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleDownload = async () => {
        try {
            const response = await axios.post("http://localhost:5000/download", { url });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error: " + error.response.data.error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Descargar Video de YouTube</h2>
            <input
                type="text"
                placeholder="Ingresa la URL del video"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={handleDownload} style={{ padding: "10px 20px" }}>Descargar</button>
            <p>{message}</p>
        </div>
    );
}

export default App;
