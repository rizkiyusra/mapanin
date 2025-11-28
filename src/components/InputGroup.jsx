import { formatNumberInput } from '../utils/finansialHelper.jsx';

const InputGroup = ({ label, value, onChange, prefix = "", type = "number", placeholder = "0", error }) => {

    const handleChange = (e) => {
        const rawInput = e.target.value;

        if (label.toLowerCase().includes('return') || label.toLowerCase().includes('durasi')) {
            onChange(rawInput);
        } else {
            const cleanNumber = rawInput.replace(/\D/g, '');
            onChange(cleanNumber);
        }
    };

    const displayValue = (label.toLowerCase().includes('return') || label.toLowerCase().includes('durasi'))
        ? value
        : formatNumberInput(value);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            {prefix}
          </span>
                )}
                <input
                    type="text"
                    value={displayValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    inputMode={type === 'number' ? 'numeric' : 'text'}
                    // LOGIC CSS: Jika ada error, border jadi MERAH (red-500), jika tidak jadi abu (gray-300)
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none transition font-semibold ${prefix ? 'pl-10' : ''} ${
                        error
                            ? 'border-red-500 focus:ring-red-200 text-red-900 placeholder-red-300'
                            : 'border-gray-300 focus:ring-teal-500 text-gray-800'
                    }`}
                />
            </div>

            {/* Tampilkan Pesan Error di Bawah Input */}
            {error && (
                <span className="text-xs text-red-500 font-medium animate-fade-in ml-1">
            * {error}
        </span>
            )}
        </div>
    );
};

export default InputGroup;