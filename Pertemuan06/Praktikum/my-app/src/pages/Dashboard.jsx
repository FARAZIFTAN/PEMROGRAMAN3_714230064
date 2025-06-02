import { TypographyAtom } from "../components/atoms/TypographyAtom";
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { ChartBarIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export function Dashboard() {
    const stats = [
        {
            title: "Total Mahasiswa",
            value: "1,234",
            icon: UserGroupIcon,
            color: "text-blue-500"
        },
        {
            title: "Mata Kuliah",
            value: "45",
            icon: AcademicCapIcon,
            color: "text-green-500"
        },
        {
            title: "Statistik",
            value: "78%",
            icon: ChartBarIcon,
            color: "text-purple-500"
        }
    ];

    return (
        <div className="p-6">
            <TypographyAtom variant="h4" className="mb-8">
                Dashboard Utama
            </TypographyAtom>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <TypographyAtom variant="h6" className="text-gray-600 mb-2">
                                        {stat.title}
                                    </TypographyAtom>
                                    <TypographyAtom variant="h3" className="font-bold text-3xl">
                                        {stat.value}
                                    </TypographyAtom>
                                </div>
                                <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10`}
                                    style={{
                                        background: `linear-gradient(120deg, ${stat.color.split("-")[0]}-100, ${stat.color.split("-")[0]}-200)`
                                    }}
                                >
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <TypographyAtom variant="h5" className="font-bold">
                            Aktivitas Terbaru
                        </TypographyAtom>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <TypographyAtom variant="paragraph" className="font-medium">
                                        Data Mahasiswa Diperbarui
                                    </TypographyAtom>
                                    <TypographyAtom variant="caption" className="text-gray-600">
                                        15 menit yang lalu
                                    </TypographyAtom>
                                </div>
                                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                    <span className="text-sm">New</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <TypographyAtom variant="paragraph" className="font-medium">
                                        Nilai Mahasiswa Diperbarui
                                    </TypographyAtom>
                                    <TypographyAtom variant="caption" className="text-gray-600">
                                        45 menit yang lalu
                                    </TypographyAtom>
                                </div>
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                    <span className="text-sm">Updated</span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <TypographyAtom variant="h5" className="font-bold">
                            Pengumuman
                        </TypographyAtom>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <TypographyAtom variant="paragraph" className="font-medium">
                                    Pengumuman UAS
                                </TypographyAtom>
                                <TypographyAtom variant="caption" className="text-gray-600">
                                    Ujian Akhir Semester akan dimulai tanggal 15 Juni 2025
                                </TypographyAtom>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <TypographyAtom variant="paragraph" className="font-medium">
                                    Jadwal Kuliah
                                </TypographyAtom>
                                <TypographyAtom variant="caption" className="text-gray-600">
                                    Jadwal kuliah semester baru akan diumumkan tanggal 1 Juli 2025
                                </TypographyAtom>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}