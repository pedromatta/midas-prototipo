import { navItems } from '../data/mockData';
import { auxNavItems } from '../data/mockData';
import {
  X, Sun, Moon
} from 'lucide-react';

const Sidebar = ({ t, activeTab, navigateToTab, setIsDark }) => (
  <aside className={`hidden md:flex flex-col w-64 ${t.sidebar} text-[#FDFDFA] min-h-screen fixed left-0 top-0 transition-colors border-r ${t.border} z-10`}>
    <div className="p-6"><h1 className="text-2xl font-black tracking-wider text-[#D4AF37]">MIDAS</h1></div>
    <nav className="flex-1 px-4 space-y-2 mt-4">
      {navItems.map(item => (
        <button key={item.id} onClick={() => navigateToTab(item.id, item.rootNode)} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#D4AF37] text-[#1A3E4E] font-bold shadow-md' : 'text-[#A8A39D] hover:bg-[#A8A39D]/10 hover:text-[#D4AF37]'}`}>
          <item.icon className="mr-3" size={20} /><span>{item.label}</span>
        </button>
      ))}
      <div className="my-6 border-t border-[#A8A39D]/20"></div>
      {auxNavItems.map(item => (
        <button key={item.id} onClick={() => navigateToTab(item.id, item.rootNode)} className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#D4AF37] text-[#1A3E4E] font-bold shadow-md' : 'text-[#A8A39D] hover:bg-[#A8A39D]/10 hover:text-[#D4AF37]'}`}>
          <item.icon className="mr-3" size={20} /><span>{item.label}</span>
        </button>
      ))}
    </nav>
    <div className="p-4 mt-auto mb-4 border-t border-[#A8A39D]/20">
      <button onClick={() => setIsDark(!t.isDark)} className="w-full flex items-center px-4 py-3 rounded-xl text-[#A8A39D] hover:bg-[#A8A39D]/10 hover:text-[#D4AF37] transition-all">
        {t.isDark ? <Sun className="mr-3" size={20} /> : <Moon className="mr-3" size={20} />}<span>{t.isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </div>
  </aside>
);

export default Sidebar
