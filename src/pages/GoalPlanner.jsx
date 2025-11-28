import { useState, useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import InputGroup from '../components/InputGroup';
import { formatRupiah, calculateScenario, parseNumberInput } from '../utils/finansialHelper.jsx';
import { Target, Clock, Calculator, ShieldCheck, TrendingUp, Zap, PieChart } from 'lucide-react';

const GoalPlanner = () => {
    useDocumentTitle('Rencana Keuangan');

    const [target, setTarget] = useState('');
    const [monthly, setMonthly] = useState('');
    const [principal, setPrincipal] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [errors, setErrors] = useState({});
    const resultRef = useRef(null);

    const handleInput = (setter, field, value) => {
        setter(value);
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleCalculate = () => {
        const newErrors = {};
        if (!target) newErrors.target = 'Target dana wajib diisi';
        if (!monthly) newErrors.monthly = 'Kemampuan menabung wajib diisi';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsCalculated(true);
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const scenarios = calculateScenario(
        parseNumberInput(target),
        parseNumberInput(monthly),
        parseNumberInput(principal)
    );

    const assetRecommendations = [
        {
            type: 'Konservatif',
            icon: <ShieldCheck className="w-5 h-5"/>,
            desc: 'Risiko rendah, fokus pada keamanan modal dan hasil stabil.',
            allocation: [
                {
                    name: 'RDPU',
                    percent: 50,
                    color: 'bg-teal-200',
                    detail: 'Reksa Dana Pasar Uang yang sangat stabil dan likuiditas tinggi.'
                },
                {
                    name: 'RDPT / RDO',
                    percent: 30,
                    color: 'bg-teal-400',
                    detail: 'Reksa Dana Pendapatan Tetap atau Reksa Dana Obligasi dengan return stabil dan resiko sedang'
                },
                {
                    name: 'Emas',
                    percent: 20,
                    color: 'bg-teal-600',
                    detail: 'Berguna melindungi nilai aset dari inflasi'
                }
            ]
        },
        {
            type: 'Moderat',
            icon: <TrendingUp className="w-5 h-5"/>,
            desc: 'Mengutamakan pertumbuhan dengan risiko terkendali.',
            allocation: [
                {
                    name: 'Reksa Dana Campuran',
                    percent: 40,
                    color: 'bg-indigo-300',
                    detail: 'Reksa Dana kombinasi dari pasar uang, obligasi, dan saham'
                },
                {
                    name: 'Saham Bluechip',
                    percent: 30,
                    color: 'bg-indigo-500',
                    detail: 'Saham perusahaan besar dengan potensi dividen dan harga stabil'
                },
                {
                    name: 'Emas & Properti',
                    percent: 30,
                    color: 'bg-indigo-700',
                    detail: 'Berguna melindungi nilai aset dari inflasi',
                }
            ]
        },
        {
            type: 'Agresif',
            icon: <Zap className="w-5 h-5"/>,
            desc: 'Risiko tinggi untuk potensi cuan tinggi.',
            allocation: [
                {
                    name: 'Saham Bluechip',
                    percent: 50,
                    color: 'bg-orange-400',
                    detail: 'Saham perusahaan besar dengan potensi dividen dan harga stabil',
                },
                {
                    name: 'Bitcoin',
                    percent: 35,
                    color: 'bg-orange-600',
                    detail: 'Aset kripto volatilitas tinggi, berpotensi untung besar dengan risiko tinggi.',
                },
                {
                    name: 'Emas & Properti',
                    percent: 15,
                    color: 'bg-orange-800',
                    detail: 'Berguna melindungi nilai aset dari inflasi',
                }
            ]
        }
    ];

    const currentScenario = scenarios[activeTab];
    const currentAsset = assetRecommendations[activeTab];

    return (
        <section className="animate-fade-in">
            {/* Header Title */}
            <div className="text-center mb-6 md:mb-10">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Rencana Keuangan</h1>
                <p className="text-sm md:text-base text-gray-500 px-4">Hitung estimasi waktu untuk mencapai impianmu.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* KOLOM KIRI: INPUT */}
                <div className="lg:col-span-4 h-fit relative lg:sticky lg:top-24 z-10">
                    <div className="bg-white p-5 md:p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
                        <div className="flex items-center gap-2 mb-6 text-gray-800 border-b pb-4">
                            <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-bold">Atur Target</h2>
                        </div>

                        <div className="space-y-5">
                            <InputGroup
                                label="Target Dana (Rp)"
                                prefix="Rp"
                                value={target}
                                onChange={(val) => handleInput(setTarget, 'target', val)}
                                placeholder="Misal: 100.000.000"
                                error={errors.target} // Validasi Merah
                            />
                            <InputGroup
                                label="Mampu Nabung (Bulan)"
                                prefix="Rp"
                                value={monthly}
                                onChange={(val) => handleInput(setMonthly, 'monthly', val)}
                                placeholder="Misal: 2.000.000"
                                error={errors.monthly} // Validasi Merah
                            />
                            <InputGroup
                                label="Modal Awal (Opsional)"
                                prefix="Rp"
                                value={principal}
                                onChange={setPrincipal} // Opsional tidak perlu validasi
                                placeholder="Misal: 5.000.000"
                            />

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                            >
                                <Calculator className="w-5 h-5" /> Hitung Analisa
                            </button>
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN: HASIL (Tidak ada perubahan di bagian ini) */}
                <div className="lg:col-span-8 scroll-mt-24 pt-4 lg:pt-0" ref={resultRef}>
                    {isCalculated ? (
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-white overflow-hidden animate-fade-in-up">
                            {/* ... Bagian Result sama persis dengan sebelumnya ... */}
                            {/* Copy paste bagian Tabs Header, Result Header, Deskripsi, Visual Alokasi dari code GoalPlanner sebelumnya */}
                            <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/50">
                                {scenarios.map((sc, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`py-4 px-1 md:px-2 text-[10px] md:text-base font-bold transition-all border-b-4 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 ${
                                            activeTab === index
                                                ? `border-${sc.color.replace('bg-', '')} text-gray-800 bg-white`
                                                : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {index === 0 && <ShieldCheck className={activeTab === index ? "text-blue-500 w-4 h-4 md:w-5 md:h-5" : "w-4 h-4 md:w-5 md:h-5"}/>}
                                        {index === 1 && <TrendingUp className={activeTab === index ? "text-purple-500 w-4 h-4 md:w-5 md:h-5" : "w-4 h-4 md:w-5 md:h-5"}/>}
                                        {index === 2 && <Zap className={activeTab === index ? "text-orange-500 w-4 h-4 md:w-5 md:h-5" : "w-4 h-4 md:w-5 md:h-5"}/>}

                                        <span className="text-center">{sc.label} <br className="md:hidden"/></span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-5 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Estimasi Waktu</p>
                                        <div className="flex items-baseline gap-1">
                                            {currentScenario.unreachable ? (
                                                <span className="text-xl font-black text-red-500">Terlalu Lama</span>
                                            ) : (
                                                <>
                                                    <span className="text-3xl font-black text-gray-900">{currentScenario.years}</span>
                                                    <span className="text-sm font-medium text-gray-500">Tahun</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-2xl border flex flex-col justify-center ${activeTab === 0 ? 'bg-blue-50 border-blue-100' : activeTab === 1 ? 'bg-indigo-50 border-indigo-100' : 'bg-orange-50 border-orange-100'}`}>
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${currentScenario.textColor}`}>Ekspektasi Return</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-3xl font-black ${currentScenario.textColor}`}>{currentScenario.rate}%</span>
                                            <span className={`text-sm font-medium ${currentScenario.textColor} opacity-70`}>/ tahun</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Potensi Profit</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-lg font-bold ${currentScenario.textColor}`}>+{formatRupiah(currentScenario.interest)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl mb-8 border border-gray-100 shadow-sm flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${currentScenario.bgSoft} text-gray-700`}>
                                        {currentAsset.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">Profil Investor {currentAsset.type}</h3>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{currentAsset.desc}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-base">
                                            <PieChart className="w-5 h-5 text-gray-400"/> Detail Alokasi Aset
                                        </h3>
                                    </div>

                                    <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-gray-100">
                                        {currentAsset.allocation.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-full ${item.color}`}
                                                style={{ width: `${item.percent}%` }}
                                            ></div>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        {currentAsset.allocation.map((item, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-teal-200 transition-colors shadow-sm">
                                                <div className="flex items-center gap-3 min-w-[200px]">
                                                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-xs font-bold text-white/80`}>
                                                        {item.percent}%
                                                    </div>
                                                    <span className="font-bold text-gray-700">{item.name}</span>
                                                </div>

                                                <div className="flex-1 border-l border-gray-100 sm:pl-4">
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {item.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 min-h-[300px] p-10 text-center">
                            <div className="bg-teal-50 p-4 rounded-full mb-4">
                                <Clock className="w-10 h-10 text-teal-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-600 mb-1">Mulai Perencanaan</h3>
                            <p className="text-sm max-w-xs mx-auto">Isi form di atas dan klik "Hitung Analisa" untuk melihat hasilnya di sini.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GoalPlanner;