const Logo = () => {
    const baseUrl = import.meta.env.BASE_URL;
    return (
        <div className="flex items-center gap-1">
            <img
                src={`${baseUrl}logo.svg`}
                alt="Logo Mapanin"
                className="w-9 h-9 shadow-md shadow-teal-100 rounded-lg hover:rotate-3 transition-transform duration-300"
            />
            <span className="font-extrabold text-2xl tracking-tight text-gray-800">
        Mapan<span className="text-teal-600">in.</span>
      </span>
        </div>
    );
};

export default Logo;