import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import {
  Sparkles,
  Download,
  RotateCcw,
  Trash2,
  FileDown,
  Shuffle,
  EyeIcon,
  Sun,
  Moon,
  Info,
  X,
} from "lucide-react";

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");

  const cardRef = useRef(null);
  const loadingTextIndex = useRef(0);
  const loadingTextTimer = useRef(null);
  const progressTimer = useRef(null);

  const loadingTexts = [
    "Mengukur aura...",
    "Menyisir blush level...",
    "Menghitung glitter potential...",
    "Analisa style & voice...",
    "Memeriksa vibes kawaii...",
    "Mempertimbangkan pose & poseability...",
  ];

  const gifs = [
    { min: 0, max: 25, src: "/gifs/low.gif", label: "Sama sekali bukan femboy" },
    { min: 26, max: 50, src: "/gifs/mid.gif", label: "Sedikit femboy, mencurigakan" },
    { min: 51, max: 75, src: "/gifs/high.gif", label: "Udah di fase femboy yang ga ketolong" },
    { min: 76, max: 100, src: "/gifs/max.gif", label: "Fembolini berbulu, sudah ga ketolong" },
  ];

  const easterEggNames = [
    "astolfo",
    "felix",
    "femboy",
    "rin",
    "mika",
    "reksa",
    "indra",
  ];
  const antiEasterEggNames = ["ryan", "rian"];

  useEffect(() => {
    const raw = localStorage.getItem("femboy_history");
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  const saveHistory = (entry) => {
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem("femboy_history", JSON.stringify(next));
  };

  const gifBy = (v) => gifs.find((g) => v >= g.min && v <= g.max) || gifs[0];

  const start = () => {
    if (!name.trim()) return;
    setStarted(true);
    setProgress(0);
    setResult(null);

    loadingTextIndex.current = 0;
    loadingTextTimer.current = setInterval(() => {
      loadingTextIndex.current = Math.floor(
        Math.random() * loadingTexts.length
      );
      setProgress((p) => p);
    }, 700);

    progressTimer.current = setInterval(() => {
      setProgress((p) => {
        const delta = Math.max(2, Math.floor(Math.random() * 12));
        const next = Math.min(100, p + delta);
        if (next >= 100) {
          clearInterval(progressTimer.current);
          clearInterval(loadingTextTimer.current);
          finalizeResult();
          return 100;
        }
        return next;
      });
    }, 250);
  };

  const finalizeResult = () => {
    let value = Math.floor(Math.random() * 101);

    if (antiEasterEggNames.includes(name.toLowerCase().trim())) value = 0;
    else if (easterEggNames.includes(name.toLowerCase().trim())) value = 100;

    setResult(value);

    saveHistory({
      name,
      value,
      date: new Date().toISOString(),
      img: gifBy(value).src,
    });
  };

  useEffect(() => {
    return () => {
      if (loadingTextTimer.current) clearInterval(loadingTextTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("femboy_history");
  };

  return (
    <div data-theme={theme} className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* NAVBAR */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="navbar bg-base-100 rounded-xl mb-6 px-4 py-3"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                Femboy Detector <Sparkles className="w-6 h-6 text-pink-500" />
              </h1>
            </div>
          </div>

          <div className="flex-none">
            <label className="swap swap-rotate btn btn-circle btn-ghost">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <Sun className="swap-on w-5 h-5" />
              <Moon className="swap-off w-5 h-5" />
            </label>
          </div>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card bg-base-100"
        >
          <div className="card-body p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* INPUT SCREEN */}
              {!started && result === null && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-2">
                    <label className="label">
                      <span className="label-text text-lg font-semibold">
                        Masukan nama untuk mulai melakukan Scan!
                      </span>
                    </label>
                    <div className="join w-full">
                      <input
                        type="text"
                        placeholder="Tulis sebuah nama..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && start()}
                        className="input input-bordered input-lg join-item flex-1 focus:input-primary"
                        autoFocus
                      />
                      <button
                        className="btn btn-lg join-item btn-square"
                        onClick={() => {
                          const pool = [
                            "Reksi",
                            "Arjuni",
                            "Riyyin",
                            "Ryan",
                            "Yanto",
                            "Ren Ren",
                            "Detri",
                            "The Legend Of Mandili",
                            "Indri",
                          ];
                          setName(
                            pool[Math.floor(Math.random() * pool.length)]
                          );
                        }}
                        title="Nama Random"
                      >
                        <Shuffle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-lg w-full gap-2"
                    onClick={start}
                    disabled={!name.trim()}
                  >
                    <Sparkles className="w-5 h-5" />
                    Mulai Analisis
                  </button>

                  <div className="alert alert-info">
                    <Info className="w-6 h-6" />
                    <div className="text-sm">
                      <strong>Pro tip:</strong> Coba nama seperti "Astolfo" atau
                      "Felix" untuk hasil spesial!
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LOADING SCREEN */}
              {started && result === null && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 py-8"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">
                        Menganalisa {name}...
                      </h3>
                      <p className="text-lg opacity-70 animate-pulse">
                        {loadingTexts[loadingTextIndex.current]}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-bold text-primary">
                        {progress}%
                      </span>
                    </div>

                    <progress
                      className="progress progress-primary w-full h-3"
                      value={progress}
                      max="100"
                    ></progress>
                  </div>
                </motion.div>
              )}

              {/* RESULT SCREEN */}
              {result !== null && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                 <div className="rounded-xl p-4 bg-base-200" ref={cardRef}>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="avatar">
                        <div className="w-64 h-64 rounded-2xl ring-offset-base-100 ring-offset-2 overflow-visible">
                          <img
                            src={`${import.meta.env.BASE_URL}${
                              gifBy(result).src
                            }`}
                            alt="result"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 gap-4 text-center sm:text-left">
                        <h2 className="text-3xl font-bold">{name}</h2>

                        <div className="flex flex-col">
                          <div className="stat-title">Femboy Level</div>
                          <div className="stat-value text-primary">
                            {result}%
                          </div>
                          <div className="stat-desc">{gifBy(result).label}</div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {result >= 75 && (
                            <div className="badge badge-secondary">
                              Ultimate
                            </div>
                          )}
                          {result >= 50 && result < 75 && (
                            <div className="badge badge-accent">Jomok</div>
                          )}
                          {result >= 25 && result < 50 && (
                            <div className="badge badge-warning">Setengah</div>
                          )}
                          {result < 25 && (
                            <div className="badge badge-neutral">Sedikit</div>
                          )}
                          {antiEasterEggNames.includes(
                            name.toLowerCase().trim()
                          ) && (
                            <div className="badge badge-error gap-1">
                              <X className="h-4 w-4" /> Not Femboy
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      className="btn btn-outline w-full gap-2 flex-1 min-w-[200px]"
                      onClick={() => {
                        setStarted(false);
                        setResult(null);
                        setName("");
                        setProgress(0);
                      }}
                    >
                      <RotateCcw className="w-5 h-5" />
                      Coba Lagi
                    </button>
                  </div>

                  {antiEasterEggNames.includes(name.toLowerCase().trim()) && (
                    <div className="alert alert-warning">
                      <X />
                      <span>{name} udah pasti bukan femboy dong..</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* HISTORY */}
        {history.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card bg-base-100 mt-6"
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  History
                  <div className="badge badge-primary">{history.length}</div>
                </h3>

                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost gap-2"
                    onClick={() => {
                      const blob = new Blob(
                        [JSON.stringify(history, null, 2)],
                        {
                          type: "application/json",
                        }
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "femboy_history.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <FileDown className="w-4 h-4" />
                    Export
                  </button>

                  <button
                    className="btn btn-sm btn-ghost gap-2"
                    onClick={clearHistory}
                  >
                    <Trash2 className="w-4 h-4" />
                    Bersihkan
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {history.map((h, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="card card-compact bg-base-200 hover:-lg transition-all"
                  >
                    <div className="card-body flex-row items-center gap-3">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-lg">
                          <img
                            src={`${import.meta.env.BASE_URL}${h.img}`}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-base">{h.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="badge badge-sm badge-primary">
                            {h.value}%
                          </div>
                          <span className="text-xs opacity-60">
                            {new Date(h.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => {
                          setName(h.name);
                          setStarted(true);
                          setProgress(100);
                          setResult(h.value);
                        }}
                        title="View result"
                      >
                        <EyeIcon size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
