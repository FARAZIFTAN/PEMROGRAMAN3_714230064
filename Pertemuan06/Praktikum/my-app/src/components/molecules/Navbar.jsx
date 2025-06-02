import { TypographyAtom } from "../atoms/TypographyAtom";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar({ onMenuClick, sidebarOpen, isDesktop }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl flex items-center justify-between px-4 md:px-8 transition-all duration-300">
      {/* Tombol hamburger di mobile */}
      {!isDesktop && (
        <button
          onClick={onMenuClick}
          className="md:hidden p-3 rounded-lg hover:bg-green-500 focus:outline-none transition duration-200"
        >
          <Bars3Icon className="h-8 w-8 text-white hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {/* Container Welcome */}
      <div
        className={`flex items-center h-full text-white transition-all duration-300 ${
          isDesktop && sidebarOpen ? "ml-64 pl-6" : "ml-4"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse"></div>
            <TypographyAtom variant="h6" className="font-semibold text-lg bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
              Welcome to Dashboard
            </TypographyAtom>
          </div>
        </div>
      </div>
    </header>
  );
}
