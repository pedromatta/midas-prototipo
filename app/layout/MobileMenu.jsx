import { navItems } from "../data/mockData";

const MobileMenu = ({ t, activeTab, navigateToTab }) => (
  <div className={`md:hidden fixed inset-0 top-16 ${t.sidebar} z-30 p-4 animate-in slide-in-from-top-2 border-b ${t.border}`}>
    <nav className="space-y-2">
      {navItems.map(item => (
        <button key={item.id} onClick={() => navigateToTab(item.id, item.rootNode)} className={`w-full flex items-center px-4 py-4 rounded-xl transition-all mb-2 ${activeTab === item.id ? 'bg-[#D4AF37] text-[#1A3E4E] font-bold' : 'bg-[#A8A39D]/10 text-[#FDFDFA]'}`}>
          <item.icon className="mr-3" size={24} /><span className="text-lg">{item.label}</span>
        </button>
      ))}
    </nav>
  </div>
);

export default MobileMenu
