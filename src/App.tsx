import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cinema from './routes/Cinema';
import Home from './routes/Home';
import SpecialDay from './routes/SpecialDay';
import Sorry from './routes/Sorry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/special-day" element={<SpecialDay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
