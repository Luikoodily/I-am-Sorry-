import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cinema from './routes/Cinema';
import SpecialDay from './routes/SpecialDay';
import Sorry from './routes/Sorry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cinema />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/special-day" element={<SpecialDay />} />
        <Route path="*" element={<Navigate to="/cinema" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
