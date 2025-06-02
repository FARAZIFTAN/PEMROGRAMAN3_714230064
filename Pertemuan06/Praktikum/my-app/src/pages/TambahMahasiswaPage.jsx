import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { MahasiswaForm } from "../components/organisms/MahasiswaForm";
import { postMahasiswa } from "../services/mahasiswaService";
import { useNavigate } from "react-router-dom";

export function TambahMahasiswaPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await postMahasiswa(data);
      // Setelah berhasil, langsung navigate ke halaman mahasiswa
      navigate("/mahasiswa");
    } catch (error) {
      console.error("Gagal menyimpan data mahasiswa:", error);
      // Optional: kamu bisa menambahkan alert() biasa kalau mau
      alert("Gagal menyimpan data mahasiswa.");
    }
  };

  return (
    <div className="py-6 px-4">
      <TypographyAtom variant="h5" className="mb-4">
        Tambah Data Mahasiswa
      </TypographyAtom>
      <MahasiswaForm onSubmit={handleSubmit} />
    </div>
  );
}