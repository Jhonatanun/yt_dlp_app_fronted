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
      setMessage("Ingrese una URL valida");
      return;
    }

    try {
      setMessage("Iniciando Descarga")
      const response = await axios.post("http://localhost:5000/download", { url, format, quality });
      setMessage(response.data.message);
  } catch (error) {
      setMessage("Error: " + error.response.data.error);
  }

    
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Descargar Video de YouTube</h2>
      <form onSubmit={handleDownload}>
        {/* Input URL */}
        <label className="block mb-2">
          URL del Video:
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded text-black"
            placeholder="https://www.youtube.com/watch?v=XXXXX"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        {/* Selección de Formato */}
        <label className="block mb-2">
          Formato:
          <select
            className="w-full p-2 mt-1 border rounded text-black"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="mkv">MKV</option>
          </select>
        </label>

        {/* Selección de Calidad */}
        <label className="block mb-4">
          Calidad:
          <select
            className="w-full p-2 mt-1 border rounded text-black"
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
          className="w-full bg-yellow-500 text-black font-bold p-2 rounded hover:bg-yellow-600"
        >
          Descargar
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default DownloadForm;
