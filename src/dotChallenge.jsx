import { useState } from "react";
import "./dotChallenge/dotChallenge.scss";

function App() {
  const [coords, setCoords] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (e) => {
    const dot = {
      x: e.clientX,
      y: e.clientY,
    };

    setCoords((prev) => [...prev, dot]);
    setUndid([]);
  };

  const handleUndo = (e) => {
    e.stopPropagation();

    if (coords.length === 0) {
      return;
    }

    setCoords((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    const lastItem = coords[coords.length - 1];
    setUndid((prev) => [...prev, lastItem]);
  };

  const handleRedo = (e) => {
    e.stopPropagation();

    if (undid.length === 0) {
      return;
    }

    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    const lastItem = undid[undid.length - 1];
    setCoords((prev) => [...prev, lastItem]);
  };

  return (
    <div id="page" onClick={handleClick}>
      <div className="flex justify-center">
        <button
          className="border rounded border-slate-400 p-2 hover:bg-gray-400"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="border rounded border-slate-400 p-2 hover:bg-gray-400"
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
      {coords.map((item) => (
        <span
          className="dot"
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        />
      ))}
    </div>
  );
}

export default App;
