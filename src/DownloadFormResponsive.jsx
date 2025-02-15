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
      setMessage("Iniciando Descarga");
      const response = await axios.post("http://localhost:5000/download", { url, format, quality });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-4 bg-secondary text-white rounded shadow w-75 w-md-50 w-lg-40">
        <h2 className="text-center">Descargar Video de YouTube</h2>
        <form onSubmit={handleDownload}>
          {/* Input URL */}
          <label className="form-label w-100">
            <p>URL del Video:</p>
            <input
              type="text"
              className="form-control w-100"
              placeholder="https://www.youtube.com/watch?v=XXXXX"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>

          {/* Selección de Formato */}
          <label className="form-label w-100">
            Formato:
            <select
              className="form-select w-100"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="mp4">MP4</option>
              <option value="webm">WebM</option>
              <option value="mkv">MKV</option>
            </select>
          </label>

          {/* Selección de Calidad */}
          <label className="form-label w-100">
            Calidad:
            <select
              className="form-select w-100"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            >
              <option value="360">360p</option>
              <option value="480">480p</option>
              <option value="720">720p</option>
              <option value="1080">1080p</option>
            </select>
          </label>

          <button
            type="submit"
            className="btn btn-warning w-100 mt-3 btn-sm"
          >
            Descargar
          </button>
          <p className="mt-2 text-center">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default DownloadForm;
