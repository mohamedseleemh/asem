'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  multiline?: boolean;
  placeholder?: string;
  adminMode: boolean;
}

export default function EditableText({
  value,
  onChange,
  className = '',
  tag = 'p',
  multiline = false,
  placeholder = 'اكتب هنا...',
  adminMode,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const Tag = tag;

  if (!adminMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="relative">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} bg-white/10 border border-gold-400/50 rounded-lg p-2 resize-none w-full focus:outline-none focus:border-gold-400`}
              placeholder={placeholder}
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} bg-white/10 border border-gold-400/50 rounded-lg p-2 w-full focus:outline-none focus:border-gold-400`}
              placeholder={placeholder}
              autoFocus
            />
          )}

          <div className="absolute top-2 left-2 flex gap-1">
            <motion.button
              onClick={handleSave}
              className="bg-green-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Check size={12} />
            </motion.button>
            <motion.button
              onClick={handleCancel}
              className="bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={12} />
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Tag className={className}>{value}</Tag>

          <motion.button
            onClick={() => setIsEditing(true)}
            className="absolute -top-2 -left-2 bg-gold-400 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit3 size={12} />
          </motion.button>
        </div>
      )}
    </div>
  );
}
