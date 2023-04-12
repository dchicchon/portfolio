import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { logEvent } from 'firebase/analytics';

export const useHistory = (analytics) => {
  const { key, pathname } = useLocation();
  const [history, setHistory] = useState([]);
  const [currentKey, setCurrentKey] = useState(null);
  const [previousKey, setPreviousKey] = useState(null);
  const contemporaryHistory = history.includes(key) ? history : [...history, key];
  const index = contemporaryHistory.indexOf(key);
  const isHistoricRoute = index + 1 < contemporaryHistory.length;
  const state = { index, isHistoricRoute, key, previousKey };
  if (history !== contemporaryHistory) {
    setHistory(contemporaryHistory);
  }
  if (key !== currentKey) {
    logEvent(analytics, `route visted: ${pathname}`);
    console.log(pathname);
    setPreviousKey(currentKey);
    setCurrentKey(key);
  }
  return state;
};
