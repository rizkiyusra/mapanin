import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle('Halaman Tidak Ditemukan');

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
            <div className="bg-red-50 p-6 rounded-full mb-6 animate-bounce">
                <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-500 max-w-md mb-8">
                Maaf, halaman yang kamu cari mungkin sudah dihapus atau link yang kamu tuju salah.
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-200"
            >
                <Home className="w-5 h-5" /> Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFound;