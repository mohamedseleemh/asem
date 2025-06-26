'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  adminMode: boolean;
}

const presetColors = [
  '#fbbf24', // gold
  '#059669', // emerald
  '#1e3a8a', // blue
  '#dc2626', // red
  '#7c3aed', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#be123c', // rose
];

export default function ColorPicker({ label, value, onChange, adminMode }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!adminMode) return null;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Palette size={16} />
        <span>{label}</span>
        <div
          className="w-4 h-4 rounded border border-white/30"
          style={{ backgroundColor: value }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-full mt-2 left-0 bg-gray-900 border border-white/20 rounded-lg p-4 shadow-xl z-50 min-w-64"
          >
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">{label}</h4>

              {/* Color Input */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-8 h-8 rounded border border-white/30 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-gold-400"
                  placeholder="#000000"
                />
              </div>

              {/* Preset Colors */}
              <div>
                <p className="text-xs text-white/70 mb-2">ألوان مقترحة:</p>
                <div className="grid grid-cols-4 gap-2">
                  {presetColors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => onChange(color)}
                      className="w-8 h-8 rounded border border-white/30 cursor-pointer"
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gold-400 text-gray-900 py-2 rounded-lg text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                تم
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
