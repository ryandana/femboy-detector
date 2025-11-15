import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finalResult, setFinalResult] = useState(null);

  const gifs = [
    { min: 0, max: 25, src: "/gifs/low.gif", label: "Not a femboy at all" },
    { min: 26, max: 50, src: "/gifs/mid.gif", label: "A bit femboy-ish" },
    { min: 51, max: 75, src: "/gifs/high.gif", label: "Pretty femboy" },
    { min: 76, max: 100, src: "/gifs/max.gif", label: "Ultimate Femboy" },
  ];

  const getGif = (value) => {
    return gifs.find((g) => value >= g.min && value <= g.max);
  };

  const startDetection = () => {
    if (!name.trim()) return;
    setStarted(true);
    setProgress(0);
    setFinalResult(null);
  };

  useEffect(() => {
    if (!started || finalResult !== null) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 15);
        if (next >= 100) {
          clearInterval(interval);
          const result = Math.floor(Math.random() * 101);
          setFinalResult(result);
          return 100;
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [started, finalResult]);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border border-neutral-200 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Femboy Detector 🔍
        </h1>

        {/* Input */}
        {!started && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Masukan nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />

            <button
              onClick={startDetection}
              className="w-full bg-neutral-900 text-white py-2 rounded-xl hover:bg-neutral-800 transition"
            >
              Mulai Deteksi
            </button>
          </div>
        )}

        {/* Loading */}
        {started && finalResult === null && (
          <div className="mt-6">
            <p classname="text-sm mb-2">Mendeteksi femboy level...</p>

            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-center mt-2 font-semibold">{progress}%</p>
          </div>
        )}

        {/* Result */}
        {finalResult !== null && (
          <div className="mt-6 text-center space-y-4">
            <h2 className="text-xl font-bold">
              {name} adalah {finalResult}% femboy 🌸
            </h2>

            <img
              src={getGif(finalResult).src}
              alt="result gif"
              className="w-full rounded-xl border border-neutral-200"
            />

            <p className="text-neutral-700">{getGif(finalResult).label}</p>

            <button
              onClick={() => {
                setStarted(false);
                setFinalResult(null);
                setName("");
              }}
              className="w-full bg-neutral-900 text-white py-2 rounded-xl hover:bg-neutral-800"
            >
              Coba lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
