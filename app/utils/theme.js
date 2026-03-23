export const getThemeTokens = (isDark) => ({
  bgMain: isDark ? 'bg-[#0B1B24]' : 'bg-[#FDFDFA]',
  bgCard: isDark ? 'bg-[#1A3E4E]' : 'bg-white',
  bgInput: isDark ? 'bg-[#0B1B24]' : 'bg-white',
  textMain: isDark ? 'text-[#FDFDFA]' : 'text-[#1A3E4E]',
  textSec: 'text-[#A8A39D]',
  border: isDark ? 'border-[#A8A39D]/20' : 'border-[#A8A39D]/30',
  hover: isDark ? 'hover:bg-[#A8A39D]/20' : 'hover:bg-[#A8A39D]/10',
  sidebar: 'bg-[#1A3E4E]',
  accent: 'bg-[#D4AF37]',
  accentText: 'text-[#D4AF37]',
  success: 'text-[#2E8B57]',
  danger: 'text-[#CD5C5C]',
  isDark
});
