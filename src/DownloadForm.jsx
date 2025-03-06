import { useState } from "react";
import axios from "axios";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("720");
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloadLink(null); // Resetear el link antes de la nueva descarga

    if (!url) {
      setMessage("Ingrese una URL válida");
      return;
    }
    try {
    setMessage("Iniciando extracion del video...");
    const response = await axios.post("http://localhost:5000/download", {
      url,
      format,
      quality
    });

    console.log("Este es el link de descarga:", response.data);

    if (response.data.success && response.data.downloadUrl) {
      setDownloadLink(response.data.downloadUrl);
      setMessage("¡Descarga lista! Puedes bajar el video.");
    } else {
      setMessage("Error al descargar el video");
    }
    } catch (error) {
      console.error("Error en la descarga:", error);
      setMessage(
        error.response?.data?.error || "Ocurrió un error inesperado"
      );
    }

  };

  const handleDownloadClick = async () => {
     if (!downloadLink) return;

  try {
    const response = await fetch(downloadLink);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `video_${Date.now()}.mp4`); // Agregar un nombre dinámico
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };
  
  
  return (
    <div className="container p-4 text-white rounded shadow w-100 w-md-75 w-lg-50">
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <h2 className="card-title text-center mb-4">Descargar Video de YouTube</h2>
          <h6>Sitios Web: Vimeo, Daylimotion, TED</h6>
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
              Extraer video
            </button>
          </form>
          {message && <p className="mt-5 text-center"><b>{message}</b></p>}

          {downloadLink && (
            <div>
              <button onClick={handleDownloadClick} className="btn btn-success w-100 mt-0 ">Descargar video</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;
