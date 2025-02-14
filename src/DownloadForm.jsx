import { useState } from "react";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("720");

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url) {
      alert("Por favor ingresa una URL válida");
      return;
    }

    const response = await fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, format, quality }),
    });

    const data = await response.json();
    console.log(data);
    alert(data.message || "Descarga iniciada");
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
      </form>
    </div>
  );
};

export default DownloadForm;
