const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="relative w-8 h-8">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-2 bg-gray-600 rounded-full opacity-25"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-1px)`,
            transformOrigin: '2px 14px',
            animation: `fade 1.2s linear infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
    <style>
      {`
        @keyframes fade {
          0%, 39%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

export default Loader;
