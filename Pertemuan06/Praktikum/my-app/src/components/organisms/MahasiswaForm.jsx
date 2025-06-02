import { useState } from "react";
import { TextFieldAtom } from "../atoms/TextFieldAtom";
import { ButtonAtom } from "../atoms/ButtonAtom";

export function MahasiswaForm({ initialValues = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        nama: initialValues.nama || "",
        npm: initialValues.npm || "",
        prodi: initialValues.prodi || "",
        fakultas: initialValues.fakultas || "",
        alamat: {
            jalan: initialValues.alamat?.jalan || "",
            kelurahan: initialValues.alamat?.kelurahan || "",
            kota: initialValues.alamat?.kota || "",
        },
        minat: initialValues.minat?.join(", ") || "",
        mataKuliah: initialValues.mata_kuliah?.map((mk) => `${mk.nama}|${mk.kode}|${mk.nilai}`).join(", ") || "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("alamat.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                alamat: {
                    ...prev.alamat,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nama) newErrors.nama = "Nama wajib diisi";
        if (!formData.npm) newErrors.npm = "NPM wajib diisi";
        if (!formData.prodi) newErrors.prodi = "Prodi wajib diisi";
        if (!formData.fakultas) newErrors.fakultas = "Fakultas wajib diisi";
        if (!formData.alamat.jalan) newErrors["alamat.jalan"] = "Jalan wajib diisi";
        if (!formData.alamat.kelurahan) newErrors["alamat.kelurahan"] = "Kelurahan wajib diisi";
        if (!formData.alamat.kota) newErrors["alamat.kota"] = "Kota wajib diisi";
        if (!formData.minat) newErrors.minat = "Minat wajib diisi";
        if (!formData.mataKuliah) newErrors.mataKuliah = "Mata kuliah wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formatted = {
            nama: formData.nama,
            npm: formData.npm,
            prodi: formData.prodi,
            fakultas: formData.fakultas,
            alamat: formData.alamat,
            minat: formData.minat.split(",").map((m) => m.trim()),
            mata_kuliah: formData.mataKuliah.split(",").map((mk) => {
                const [nama, kode, nilai] = mk.split("|").map((item) => item.trim());
                return { nama, kode, nilai: Number(nilai) };
            }),
        };

        onSubmit(formatted);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
            <TextFieldAtom label="Nama" name="nama" value={formData.nama} onChange={handleChange} error={!!errors.nama} helperText={errors.nama || " "} />
            <TextFieldAtom label="NPM" name="npm" value={formData.npm} onChange={handleChange} error={!!errors.npm} helperText={errors.npm || " "} />
            <TextFieldAtom label="Prodi" name="prodi" value={formData.prodi} onChange={handleChange} error={!!errors.prodi} helperText={errors.prodi || " "} />
            <TextFieldAtom label="Fakultas" name="fakultas" value={formData.fakultas} onChange={handleChange} error={!!errors.fakultas} helperText={errors.fakultas || " "} />

            <TextFieldAtom label="Alamat - Jalan" name="alamat.jalan" value={formData.alamat.jalan} onChange={handleChange} error={!!errors["alamat.jalan"]} helperText={errors["alamat.jalan"] || " "} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFieldAtom
                    label="Alamat - Kelurahan"
                    name="alamat.kelurahan"
                    value={formData.alamat.kelurahan}
                    onChange={handleChange}
                    error={!!errors["alamat.kelurahan"]}
                    helperText={errors["alamat.kelurahan"] || " "}
                />
                <TextFieldAtom
                    label="Alamat - Kota"
                    name="alamat.kota"
                    value={formData.alamat.kota}
                    onChange={handleChange}
                    error={!!errors["alamat.kota"]}
                    helperText={errors["alamat.kota"] || " "}
                />
            </div>

            <TextFieldAtom label="Minat (pisahkan dengan koma)" name="minat" value={formData.minat} onChange={handleChange} error={!!errors.minat} helperText={errors.minat || " "} />
            <TextFieldAtom label="Mata Kuliah (format: NAMA | KODE | NILAI)" name="mataKuliah" value={formData.mataKuliah} onChange={handleChange} error={!!errors.mataKuliah} helperText={errors.mataKuliah || " "} />

            <div className="flex justify-end pt-2">
                <ButtonAtom color="blue" type="submit">
                    Simpan
                </ButtonAtom>
            </div>
        </form>
    );
}