import { TableWithStripedRows } from "../components/organisms/TableWithStripedRows";
import { Card, CardHeader, CardBody, TypographyAtom } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function MahasiswaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <TypographyAtom variant="h5" className="font-bold">
              Data Mahasiswa
            </TypographyAtom>
            <button className="bg-white text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
              <PlusIcon className="w-5 h-5 mr-2" />
              Tambah Mahasiswa
            </button>
          </div>
        </CardHeader>

        <CardBody>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mahasiswa..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <TableWithStripedRows />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}