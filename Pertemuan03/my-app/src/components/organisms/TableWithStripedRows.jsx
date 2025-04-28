import { Card } from "@material-tailwind/react";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { TypographyAtom } from "../atoms/TypographyAtom";
import { useMahasiswa } from "../../hooks/useMahasiswa";

const TABLE_HEAD = ["NPM", "Name", "Prodi", "Fakultas", "Minat", "Mata Kuliah"];

export function TableWithStripedRows() {
    const { users, loading, error, retry } = useMahasiswa();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <TypographyAtom variant="h6" color="gray">
                    Loading...
                </TypographyAtom>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <TypographyAtom variant="h6" color="red">
                    Gagal mengambil data mahasiswa.
                </TypographyAtom>
                <ButtonAtom color="red" onClick={retry}>
                    Coba Lagi
                </ButtonAtom>
            </div>
        );
    }

    return (
        <Card className="h-full w-full overflow-auto p-6 shadow-lg rounded-xl bg-white">
            <div className="flex justify-end p-4">
                <ButtonAtom color="blue" className="transition-all duration-300 hover:bg-blue-700 text-white">
                    Tambah Data
                </ButtonAtom>
            </div>

            <table className="w-full min-w-max table-auto text-left border-separate border-spacing-0">
                <thead>
                    <tr className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 p-4">
                                <TypographyAtom
                                    variant="small"
                                    color="white"
                                    className="font-semibold leading-none opacity-90"
                                >
                                    {head}
                                </TypographyAtom>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="even:bg-blue-gray-50/50 hover:bg-green-100 transition-all duration-300">
                            <td className="p-4">{user.npm}</td>
                            <td className="p-4">{user.nama}</td>
                            <td className="p-4">{user.prodi}</td>
                            <td className="p-4">{user.fakultas}</td>
                            <td className="p-4">
                                <ul className="list-disc pl-5 space-y-1">
                                    {user.minat.map((minat, index) => (
                                        <li key={index} className="text-sm text-gray-700">{minat}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-4">
                                <ul className="list-disc pl-5 space-y-1">
                                    {user.mata_kuliah.map((mk, index) => (
                                        <li key={index} className="text-sm text-gray-700">
                                            {mk.nama} ({mk.kode}) - Nilai: <span className="font-semibold">{mk.nilai}</span>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}
