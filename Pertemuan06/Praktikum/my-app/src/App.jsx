import { Routes, Route } from "react-router-dom";
import { LayoutDashboard } from "./components/layouts/LayoutDashboard";
import { Dashboard } from "./pages/Dashboard";
import { MahasiswaPage } from "./pages/MahasiswaPage";
import { TambahMahasiswaPage } from "./pages/TambahMahasiswaPage";

function App() {
  return (
    <LayoutDashboard>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mahasiswa" element={<MahasiswaPage />} />
        <Route path="/mahasiswa/tambah" element={<TambahMahasiswaPage />} />
      </Routes>
    </LayoutDashboard>
  );
}

export default App;