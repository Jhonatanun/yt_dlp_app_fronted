import { useState } from "react";
import axios from "axios";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("720");
  const [message, setMessage] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url) {
      setMessage("Ingrese una URL válida");
      return;
    }

    try {
      setMessage("Iniciando Descarga...");
      const response = await axios.post("http://localhost:5000/download", { url, format, quality });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="container p-4 text-white rounded shadow w-50">
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <h2 className="card-title text-center mb-4">Descargar Video de YouTube</h2>
          <form onSubmit={handleDownload}>
            {/* Input URL */}
            <div className="mb-3">
              <label className="form-label">URL del Video:</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://www.youtube.com/watch?v=XXXXX"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Selección de Formato */}
            <div className="mb-3">
              <label className="form-label">Formato:</label>
              <select
                className="form-select"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="mkv">MKV</option>
              </select>
            </div>

            {/* Selección de Calidad */}
            <div className="mb-3">
              <label className="form-label">Calidad:</label>
              <select
                className="form-select"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="360">360p</option>
                <option value="480">480p</option>
                <option value="720">720p</option>
                <option value="1080">1080p</option>
              </select>
            </div>

            <button type="submit" className="btn btn-warning w-100">
              Descargar
            </button>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;
