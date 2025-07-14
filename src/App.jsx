import React, { useRef, useEffect, useState } from "react";
import View from "./view";
import SketchCanvas from "./SketchCanvas";
import { RiDeleteBin5Fill } from "react-icons/ri";
import WelcomePage from "./WelcomePage";

function App() {
  const canvasRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine ? "Online" : "Offline");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Geolocation API integration
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setLocationError("Location unavailable");
        }
      );
    } else {
      setLocationError("Geolocation not supported");
    }
  }, []);

  // Network Information API
  useEffect(() => {
    const updateStatus = () => setNetworkStatus(navigator.onLine ? "Online" : "Offline");
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // Load saved notes from localStorage
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("quick-notes")) || [];
    setSavedNotes(notes);
  }, []);

  // Save note and sketch
  const handleSave = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const newNote = {
      note,
      image,
      location,
      timestamp: new Date().toISOString(),
    };
    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    localStorage.setItem("quick-notes", JSON.stringify(updatedNotes));
    setNote("");
    // Clear canvas
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Delete a note/sketch by index
  const handleDeleteByIndex = (idx) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== idx);
    setSavedNotes(updatedNotes);
    localStorage.setItem("quick-notes", JSON.stringify(updatedNotes));
    if (selectedNote && savedNotes[idx] === selectedNote) setSelectedNote(null);
  };

  if (showWelcome) {
    return <WelcomePage onGetStarted={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen w-full h-full bg-blue-50 via-white to-indigo-100 flex flex-col p-10 ">
      <header className="w-full text-center py-8 bg-white/80 shadow-md rounded-3xl ">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-2 tracking-tight drop-shadow">Quick Note & Sketch Board</h1>
        <p className="text-lg text-gray-600 font-medium">Jot down notes, sketch ideas, and save them with your location!</p>
      </header>
      <main className="flex-1 w-full h-full flex flex-col px-0 py-0">
        <div className="w-full flex flex-col md:flex-row gap-0 items-stretch justify-stretch">
          <textarea
            className="flex-1 min-w-0 h-[60vh] p-4 rounded-2xl border-2 border-blue-200 shadow-lg resize-none text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            placeholder="Write your note here..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <SketchCanvas ref={canvasRef} heightVh={60} />
        </div>
        <div className="w-full flex flex-col items-center gap-2 mt-4">
          <div className="text-base text-gray-700 font-medium">
            {location && (
              <span>Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
            )}
            {locationError && (
              <span className="text-red-500">{locationError}</span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between px-4 mt-2">
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all"
            onClick={handleSave}
            disabled={!note && !canvasRef.current}
          >
            Save Note & Sketch
          </button>
          <div className="text-base text-gray-500 font-medium">Network status: <span className={networkStatus === "Online" ? "text-green-600" : "text-red-600"}>{networkStatus}</span></div>
        </div>
        <section className="w-full mt-10 px-4">
          <h2 className="text-2xl font-bold mb-5 text-blue-700">Saved Notes & Sketches</h2>
          <div className="flex flex-col gap-4">
            {savedNotes.length === 0 && (
              <div className="bg-white/90 rounded-xl shadow p-6 min-h-[80px] text-gray-400 border border-gray-200">No notes or sketches yet.</div>
            )}
            {savedNotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition relative"
                onClick={() => setSelectedNote(item)}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-2 rounded-full focus:outline-none z-10"
                  title="Delete this note/sketch"
                  onClick={e => { e.stopPropagation(); handleDeleteByIndex(idx); }}
                >
                  <RiDeleteBin5Fill className="text-2xl"/>

                </button>
                <div className="flex-1 mt-5 ml-5">
                  <div className="text-gray-800 text-lg mb-2">{item.note || <span className="italic text-gray-400">(No note)</span>}</div>
                  <div className="text-sm text-gray-500 mb-1">{item.location ? `Location: ${item.location.lat.toFixed(5)}, ${item.location.lng.toFixed(5)}` : "Location: Unknown"}</div>
                  <div className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</div>
                </div>
                <div className="flex-shrink-0 w-full md:w-48 h-32 flex items-center justify-center">
                  <img src={item.image} alt="Sketch" className="max-w-full max-h-full rounded border" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {selectedNote && <View note={selectedNote} onClose={() => setSelectedNote(null)} onDelete={handleDeleteByIndex} />}
    </div>
  );
}

export default App;
