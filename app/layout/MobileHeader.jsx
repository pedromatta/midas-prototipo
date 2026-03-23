import {
  Menu, X, Sun, Moon,
} from 'lucide-react';

const MobileHeader = ({ t, setIsDark, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <header className={`md:hidden ${t.sidebar} text-[#FDFDFA] p-4 flex justify-between items-center sticky top-0 z-20 transition-colors border-b ${t.border}`}>
    <h1 className="text-xl font-black tracking-wider text-[#D4AF37]">MIDAS</h1>
    <div className="flex items-center space-x-2">
      <button onClick={() => setIsDark(!t.isDark)} className="p-2 text-[#A8A39D] hover:text-[#D4AF37]">
        {t.isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#D4AF37]">
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </header>
);

export default MobileHeader
