import axios from "axios";

// Konfigurasi base url
const API_BASE_URL = "http://127.0.0.1:8088/api/mhs";

// GET: Ambil semua data mahasiswa
export const getAllMahasiswa = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.data || [];
};

// POST: Tambah mahasiswa
export const postMahasiswa = async (payload) => {
  const response = await axios.post(API_BASE_URL, payload);
  return response.data;
};