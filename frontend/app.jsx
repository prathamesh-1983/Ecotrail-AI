import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import ResultCard from "./components/ResultCard";
import Journal from "./components/Journal";
import {
  analyzeImage,
  getObservations,
  saveObservation,
} from "./services/api";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );

  useEffect(() => {
    getObservations()
      .then(setObservations)
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(nextFile) {
    setFile(nextFile);
    setResult(null);
    setSaved(false);
    setError("");
  }

  async function handleAnalyze() {
    if (!file) return;

    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;

    try {
      const savedObservation = await saveObservation(result);
      setObservations((current) => [savedObservation, ...current]);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">HACKTOBERFEST · TOUCH GRASS</p>
            <h1>Your AI guide to the <em>real world.</em></h1>
            <p className="hero-copy">
              Identify what you discover outdoors with open-source AI running
              locally. Then put your phone away and keep exploring.
            </p>
          </div>

          <div className="hero-card">
            <span>LOCAL-FIRST</span>
            <strong>AI that helps you go outside.</strong>
            <small>
              Photos are sent to your local Ollama instance, not a cloud AI
              provider.
            </small>
          </div>
        </section>

        {error && (
          <div className="error-banner">
            <strong>Something went wrong:</strong> {error}
          </div>
        )}

        <div className="workspace">
          <ImageUploader
            file={file}
            preview={preview}
            onFile={handleFile}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
          <ResultCard
            result={result}
            onSave={handleSave}
            saved={saved}
          />
        </div>

        <Journal observations={observations} />

        <section className="safety-note">
          <strong>🌱 Remember:</strong> AI identification is a helpful guess,
          not a scientific or safety authority. Never eat or handle an
          unknown organism based only on this app.
        </section>
      </main>

      <footer>
        <span>EcoTrail AI</span>
        <span>Built for Hacktoberfest 2026 · Open-source AI</span>
      </footer>
    </div>
  );
}
