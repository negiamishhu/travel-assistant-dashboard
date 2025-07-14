import React from "react";

const View = ({ note, onClose, onDelete }) => {
  if (!note) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative border-2 border-blue-200">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className="text-gray-500 hover:text-red-500 text-2xl font-bold px-2"
            onClick={onClose}
            title="Close"
          >
            &times;
          </button>
           
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center mt-6">
          <div className="flex-shrink-0 w-full md:w-80 h-64 flex items-center justify-center bg-blue-50 rounded-xl border border-blue-100">
            <img src={note.image} alt="Sketch" className="max-w-full max-h-full rounded border shadow" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-3xl font-extrabold text-blue-700 mb-2">Full Note & Sketch</div>
            <div className="text-lg text-gray-800 mb-2 whitespace-pre-line">{note.note || <span className="italic text-gray-400">(No note)</span>}</div>
            <div className="text-sm text-blue-600 mb-1 font-medium">{note.location ? `Location: ${note.location.lat.toFixed(5)}, ${note.location.lng.toFixed(5)}` : "Location: Unknown"}</div>
            <div className="text-xs text-gray-400">{new Date(note.timestamp).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View; 