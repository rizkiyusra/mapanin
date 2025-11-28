import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Calculator, Target } from 'lucide-react';
const Layout = ({ children }) => {
    const location = useLocation();
    const isCalcActive = location.pathname === '/' || location.pathname.startsWith('/result');
    const isPlanActive = location.pathname === '/plan';

    const bottomNavItemClass = (active) => `flex flex-col items-center justify-center w-full py-3 transition-colors ${
        active ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
    }`;

    const desktopBtnClass = (active) => active
        ? "bg-teal-600 text-white shadow-md shadow-teal-200"
        : "text-gray-500 hover:bg-teal-50 hover:text-teal-600";

    const btnClass = (active) => active
        ? "bg-teal-600 text-white shadow-md shadow-teal-200"
        : "text-gray-600 hover:bg-teal-50 hover:text-teal-600";

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col pb-20 md:pb-0"> {/* Tambah padding bawah di HP agar konten tidak tertutup menu */}

            {/* HEADER ATAS (Mobile: Cuma Logo, Desktop: Logo + Menu) */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex justify-center md:justify-between h-16 md:h-20 items-center relative">

                        {/* Logo selalu di tengah saat mobile, di kiri saat desktop */}
                        <Link to="/">
                            <Logo />
                        </Link>

                        {/* Desktop Menu (Hidden di HP) */}
                        <div className="hidden md:flex items-center gap-2 bg-gray-100/50 p-1 rounded-xl">
                            <Link to="/" className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${desktopBtnClass(isCalcActive)}`}>
                                Kalkulator
                            </Link>
                            <Link to="/plan" className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${desktopBtnClass(isPlanActive)}`}>
                                Rencana
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="max-w-5xl mx-auto p-4 md:p-8 flex-grow w-full">
                {children}
            </main>

            <footer className="hidden md:block bg-white border-t border-gray-100 py-8 mt-10">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                        &copy; {new Date().getFullYear()} <span className="font-bold text-teal-700">Mapanin</span>.
                        <span className="mx-2 text-gray-300">|</span>
                        Developed by <span className="text-gray-600 font-bold transition-colors">Rizki Maulana Yusra</span>
                    </p>
                </div>
            </footer>

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
                <div className="flex justify-around items-center">
                    <Link to="/" className={bottomNavItemClass(isCalcActive)}>
                        <Calculator className={`w-6 h-6 mb-1 ${isCalcActive ? 'fill-teal-100' : ''}`} />
                        <span className="text-[10px] font-bold">Kalkulator</span>
                    </Link>
                    <Link to="/plan" className={bottomNavItemClass(isPlanActive)}>
                        <Target className={`w-6 h-6 mb-1 ${isPlanActive ? 'fill-teal-100' : ''}`} />
                        <span className="text-[10px] font-bold">Rencana</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Layout;