import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import InputGroup from '../components/InputGroup';

const Calculator = () => {
    useDocumentTitle('Kalkulator Investasi');
    const navigate = useNavigate();
    const [mode, setMode] = useState('monthly');

    const [values, setValues] = useState({
        principal: '',
        monthly: '',
        rate: '',
        years: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, val) => {
        setValues(prev => ({ ...prev, [field]: val }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!values.principal) newErrors.principal = 'Modal awal wajib diisi';
        if (mode === 'monthly' && !values.monthly) newErrors.monthly = 'Tabungan rutin wajib diisi';
        if (!values.rate) newErrors.rate = 'Bunga (%) wajib diisi';
        if (!values.years) newErrors.years = 'Durasi tahun wajib diisi';

        setErrors(newErrors);
        // Return true jika tidak ada error (object kosong)
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Cek Validasi dulu
        if (!validateForm()) {
            return; // Stop jika ada error, jangan pindah halaman
        }

        const query = new URLSearchParams({
            principal: values.principal,
            monthly: mode === 'lump' ? '0' : values.monthly,
            rate: values.rate.replace(',', '.'),
            years: values.years
        }).toString();

        navigate(`/result?${query}`);
    };

    return (
        <section className="max-w-xl mx-auto animate-fade-in pb-4">
            <div className="bg-white p-5 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">

                <header className="mb-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">Kalkulator Aset 🚀</h1>

                        <div className="bg-gray-100 p-1 rounded-lg flex text-[10px] md:text-xs font-bold">
                            <button
                                type="button"
                                onClick={() => { setMode('monthly'); setErrors({}); }} // Reset error saat ganti mode
                                className={`px-3 py-1.5 rounded-md transition ${mode === 'monthly' ? 'bg-white shadow text-teal-600' : 'text-gray-400'}`}
                            >
                                Rutin
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMode('lump');
                                    handleChange('monthly', '');
                                    setErrors({}); // Reset error saat ganti mode
                                }}
                                className={`px-3 py-1.5 rounded-md transition ${mode === 'lump' ? 'bg-white shadow text-teal-600' : 'text-gray-400'}`}
                            >
                                Sekali Setor
                            </button>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputGroup
                        label="Modal Awal"
                        prefix="Rp"
                        value={values.principal}
                        onChange={(val) => handleChange('principal', val)}
                        placeholder="0"
                        error={errors.principal} // Kirim pesan error ke komponen
                    />

                    {mode === 'monthly' && (
                        <div className="animate-fade-in">
                            <InputGroup
                                label="Nabung Rutin (Bulanan)"
                                prefix="Rp"
                                value={values.monthly}
                                onChange={(val) => handleChange('monthly', val)}
                                error={errors.monthly}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup
                            label="Return (%)"
                            value={values.rate}
                            onChange={(val) => handleChange('rate', val)}
                            placeholder="Ex: 6.5"
                            type="text"
                            error={errors.rate}
                        />
                        <InputGroup
                            label="Durasi (Tahun)"
                            value={values.years}
                            onChange={(val) => handleChange('years', val)}
                            error={errors.years}
                        />
                    </div>

                    <div className="flex gap-2 text-xs overflow-x-auto pb-2 scrollbar-hide">
                        {[4, 6, 8, 10, 12].map(r => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => handleChange('rate', r.toString())}
                                className="px-4 py-1.5 bg-teal-50 text-teal-700 border border-teal-100 rounded-full hover:bg-teal-100 font-medium whitespace-nowrap transition"
                            >
                                {r}%
                            </button>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
                        Hitung Sekarang
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Calculator;