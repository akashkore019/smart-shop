export default function Footer() {
  return (
    <footer className="text-center text-sm py-6 mt-8 bg-white/50 backdrop-blur-sm border-t-2 border-emerald-100">
      <p className="text-gray-600 font-medium">
        Made with <span className="text-red-500 animate-pulse-slow">❤️</span> in Alandi, Pune
      </p>
      <p className="text-gray-500 text-xs mt-1">
        © Mega Store {new Date().getFullYear()} - All Rights Reserved
      </p>
    </footer>
  );
}
