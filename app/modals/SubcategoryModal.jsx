import {
  X, Trash2
} from 'lucide-react';

const SubcategoryModal = ({ t, isOpen, onClose, mode, editingSub, appData, drillDownPath, onDelete }) => {
  if (!isOpen) return null;
  const isEditing = mode === 'edit';

  let initialName = '', initialPercent = 0, initialColor = '';
  if (isEditing && editingSub) {
    let current = appData[drillDownPath[0]];
    for (let i = 1; i < drillDownPath.length; i++) current = current.children.find(c => c.name === drillDownPath[i]);
    const child = current.children?.find(c => c.name === editingSub);
    if (child) { initialName = child.name; initialPercent = child.percent; initialColor = child.color }
    else { initialName = current.name; initialPercent = current.percent; initialColor = current.color }
  }

  return (
    <div className="fixed inset-0 bg-[#061015]/80 z-50 flex items-center justify-center p-4">
      <div className={`${t.bgCard} w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 border ${t.border}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${t.textMain}`}>{isEditing ? 'Editar Subcategoria' : 'Nova Subcategoria'}</h2>
          <button onClick={onClose} className={`p-2 ${t.hover} rounded-full ${t.textMain}`}><X size={24} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={`text-sm font-medium ${t.textSec}`}>Nome da Categoria</label>
            <input type="text" defaultValue={initialName} className={`w-full mt-1 px-4 py-3 ${t.bgInput} border ${t.border} rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none ${t.textMain}`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-sm font-medium ${t.textSec}`}>Meta (%)</label>
              <div className="relative mt-1">
                <input type="number" defaultValue={initialPercent} className={`w-full px-4 py-3 ${t.bgInput} border ${t.border} rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none pr-8 ${t.textMain}`} min="0" max="100" />
                <span className={`absolute right-4 top-3 ${t.textSec} font-medium`}>%</span>
              </div>
            </div>
            <div>
              <label className={`text-sm font-medium ${t.textSec}`}>Cor</label>
              <input type="color" defaultValue={initialColor} className="w-full h-12 mt-1 rounded-xl cursor-pointer border-0 bg-transparent p-0" />
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-8">
          {isEditing && <button onClick={() => onDelete(editingSub)} className="py-3 px-4 font-bold text-(--color-alert) hover:bg-(--color-alert)/10 rounded-xl transition-colors"><Trash2 size={20} /></button>}
          <button onClick={onClose} className={`flex-1 py-3 font-bold ${t.textMain} ${t.hover} rounded-xl transition-colors`}>Cancelar</button>
          <button onClick={onClose} className="flex-1 py-3 font-bold bg-[#D4AF37] text-[#1A3E4E] rounded-xl shadow-lg hover:brightness-95 transition-colors">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal
