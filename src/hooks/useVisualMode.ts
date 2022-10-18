import { useState } from "react";

const useVisualMode = (initial: string) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode: string, replace = false) => {
    setMode(newMode);
    if (replace) setHistory(prev => prev.slice(0, prev.length - 1));
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = prev.slice(0, prev.length - 1);
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;