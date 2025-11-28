import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { generateGrowthData, formatRupiah, formatCompactNumber } from '../utils/finansialHelper.jsx';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Result = () => {
    useDocumentTitle('Hasil Analisa');
    const [searchParams] = useSearchParams();

    const principal = Number(searchParams.get('principal'));
    const monthly = Number(searchParams.get('monthly'));
    const rate = Number(searchParams.get('rate'));
    const years = Number(searchParams.get('years'));

    if (!principal && principal !== 0) return <Navigate to="/" />;

    const data = generateGrowthData(principal, monthly, rate, years);
    const finalData = data[data.length - 1];

    const profitPercentage = ((finalData.interest / finalData.invested) * 100).toFixed(2).replace('.', ',');

    const chartData = {
        labels: data.map(d => `Thn ${d.year}`),
        datasets: [
            {
                label: 'Total Kekayaan',
                data: data.map(d => d.balance),
                borderColor: 'rgb(13, 148, 136)',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Modal Disetor',
                data: data.map(d => d.invested),
                borderColor: 'rgb(156, 163, 175)',
                borderDash: [5, 5],
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const label = ctx.dataset.label || '';
                        return `${label}: ${formatRupiah(ctx.raw)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="w-full max-w-full overflow-x-hidden space-y-6 animate-fade-in-up pb-24 md:pb-10 px-1">

            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-teal-600 font-medium transition ml-1">
                <ArrowLeft className="w-4 h-4 mr-1"/> Hitung Ulang
            </Link>

            {/* HEADER SECTION */}
            <section className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-white overflow-hidden relative w-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                <div className="p-6 md:p-10 relative z-10 w-full">
                    <h2 className="text-sm md:text-lg font-semibold text-gray-500 mb-6 uppercase tracking-wider text-center md:text-left">
                        Ringkasan Investasi
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 w-full min-w-0">

                            <div className="text-center md:text-left">
                                <p className="text-gray-500 font-medium mb-1 text-sm md:text-base">Estimasi Saldo Akhir</p>

                                <h1
                                    className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
                                    style={{ wordBreak: 'break-word' }}
                                    title={formatRupiah(finalData.balance)}
                                >
                                    {formatCompactNumber(finalData.balance)}
                                </h1>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl">
                                <div className="text-center md:text-left min-w-0">
                                    <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Modal</p>
                                    <p className="font-bold text-gray-700 text-sm md:text-lg truncate">
                                        {formatCompactNumber(finalData.invested)}
                                    </p>
                                </div>
                                <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4 text-center md:text-left min-w-0">
                                    <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Bunga</p>
                                    <p className="font-bold text-teal-600 text-sm md:text-lg truncate">
                                        +{formatCompactNumber(finalData.interest)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end w-full">
                            <div className="bg-teal-50 rounded-2xl p-6 text-center border border-teal-100 w-full md:w-auto min-w-[200px]">
                                <p className="text-teal-600 font-medium mb-1 text-sm">Pertumbuhan</p>
                                <div className="flex items-center justify-center gap-1 text-teal-700 flex-wrap">
                                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                                    <span className="text-3xl md:text-5xl font-black tracking-tighter break-all">
                                {profitPercentage}%
                             </span>
                                </div>
                                <p className="text-xs text-teal-500 mt-2 font-medium bg-white px-2 py-1 rounded-full inline-block shadow-sm">
                                    Profit Margin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-100 h-[350px] md:h-[400px]">
                <h3 className="font-bold text-gray-700 mb-4 text-sm md:text-base">Grafik Pertumbuhan</h3>
                <div className="h-[280px] md:h-[320px] w-full">
                    <Line data={chartData} options={options} />
                </div>
            </section>

            {/* TABLE SECTION */}
            <section className="bg-white rounded-2xl shadow-md border border-gray-100 w-full flex flex-col overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/30">
                    <h3 className="font-bold text-gray-700 text-sm md:text-base">Laporan Tahunan</h3>
                </div>

                <div className="w-full overflow-x-auto touch-pan-x pb-2">
                    <table className="w-full min-w-max text-sm text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            {/* PERBAIKAN KOLOM TAHUN:
                            1. px-4 (dikurangi dari px-6) agar tidak terlalu lebar.
                            2. Menghapus drop-shadow, diganti border-r (garis kanan) agar menyatu.
                        */}
                            <th className="px-4 py-4 whitespace-nowrap border-b border-r border-gray-200 sticky left-0 bg-gray-50 z-10 w-20 text-center">Tahun</th>
                            <th className="px-6 py-4 whitespace-nowrap border-b border-gray-100">Modal Disetor</th>
                            <th className="px-6 py-4 whitespace-nowrap border-b border-gray-100">Bunga Didapat</th>
                            <th className="px-6 py-4 whitespace-nowrap text-right border-b border-gray-100">Total Saldo</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {data.map((row) => (
                            <tr key={row.year} className="hover:bg-gray-50 transition-colors">
                                {/* PERBAIKAN KOLOM TAHUN (BODY):
                                1. px-4 agar ramping.
                                2. border-r agar terlihat rapi.
                                3. bg-white agar menutupi text saat discroll.
                            */}
                                <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-100 z-10 text-center">{row.year}</td>

                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatRupiah(row.invested)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">+{formatRupiah(row.interest)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-teal-600">{formatRupiah(row.balance)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Result;