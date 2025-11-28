// Format angka ke Rupiah dengan "Rp" dan titik
export const formatRupiah = (number) => {
    const isInteger = number % 1 === 0;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: isInteger ? 0 : 2,
        maximumFractionDigits: isInteger ? 0 : 2,
    }).format(number);
};

export const formatCompactNumber = (number) => {
    if (number < 1000000000) {
        return formatRupiah(number);
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2
    }).format(number);
};

export const formatNumberInput = (value) => {
    if (!value) return '';
    const rawValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(rawValue);
};

export const parseNumberInput = (formattedValue) => {
    if (!formattedValue) return 0;
    return Number(formattedValue.toString().replace(/\./g, '').replace(',', '.'));
};

export const generateGrowthData = (principal, monthly, rate, years) => {
    const r = rate / 100;
    const isLumpSum = monthly === 0;

    let currentBalance = principal;
    let totalInvested = principal;
    const yearlyData = [];

    yearlyData.push({
        year: 0,
        invested: principal,
        balance: principal,
        interest: 0
    });

    if (isLumpSum) {
        for (let i = 1; i <= years; i++) {
            currentBalance = currentBalance * (1 + r);
            yearlyData.push({
                year: i,
                invested: principal,
                balance: currentBalance,
                interest: currentBalance - principal
            });
        }
    } else {
        const n = 12;
        const totalMonths = years * 12;
        for (let i = 1; i <= totalMonths; i++) {
            currentBalance = currentBalance * (1 + r/n);
            currentBalance += monthly;
            totalInvested += monthly;

            if (i % 12 === 0) {
                yearlyData.push({
                    year: i / 12,
                    invested: totalInvested,
                    balance: currentBalance,
                    interest: currentBalance - totalInvested
                });
            }
        }
    }
    return yearlyData;
};

export const calculateScenario = (target, monthly, principal = 0) => {
    const scenarios = [
        { label: 'Konservatif', rate: 4, color: 'bg-blue-500', textColor: 'text-blue-600', bgSoft: 'bg-blue-50' },
        { label: 'Moderat', rate: 8, color: 'bg-purple-500', textColor: 'text-purple-600', bgSoft: 'bg-purple-50' },
        { label: 'Agresif', rate: 12, color: 'bg-orange-500', textColor: 'text-orange-600', bgSoft: 'bg-orange-50' },
    ];

    return scenarios.map((sc) => {
        let months = 0;
        let current = principal;
        const r = sc.rate / 100 / 12;

        while (current < target && months < 1200) {
            current = current * (1 + r) + monthly;
            months++;
        }

        if (months >= 1200) {
            return { ...sc, years: '> 100', totalInvested: 0, interest: 0, unreachable: true };
        }

        const yearsRaw = months / 12;
        const years = new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        }).format(yearsRaw);
        
        const totalInvested = principal + (monthly * months);
        const interest = target - totalInvested;

        return { ...sc, years, totalInvested, interest, unreachable: false };
    });
};