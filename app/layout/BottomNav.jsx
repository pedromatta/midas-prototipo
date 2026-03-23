import { navItems } from '../data/mockData';

const BottomNav = ({ t, activeTab, navigateToTab }) => (
  <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${t.bgCard} border-t ${t.border} px-6 py-3 flex justify-between items-center z-20 pb-safe transition-colors`}>
    {navItems.map(item => (
      <button key={item.id} onClick={() => navigateToTab(item.id, item.rootNode)} className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#D4AF37] text-[#1A3E4E] shadow-sm' : 'text-[#A8A39D] hover:text-[#D4AF37]'}`}>
        <item.icon size={22} className={activeTab === item.id ? 'stroke-2' : 'stroke-[1.5]'} />
        {activeTab === item.id && <span className="text-[10px] font-bold mt-1 leading-none">{item.label}</span>}
      </button>
    ))}
  </nav>
);

export default BottomNav
