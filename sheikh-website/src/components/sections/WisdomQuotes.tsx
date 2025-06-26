'use client';

import { motion } from 'framer-motion';
import EditableText from '../admin/EditableText';

interface Quote {
  id: number;
  arabic: string;
  translation: string;
  source: string;
}

interface WisdomQuotesProps {
  quotes: Quote[];
  onUpdate: (quotes: Quote[]) => void;
  adminMode: boolean;
}

export default function WisdomQuotes({ quotes, onUpdate, adminMode }: WisdomQuotesProps) {
  const updateQuote = (index: number, field: keyof Quote, value: string) => {
    const updatedQuotes = quotes.map((quote, i) =>
      i === index ? { ...quote, [field]: value } : quote
    );
    onUpdate(updatedQuotes);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          آيات من القرآن الكريم
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              }}
            >
              <div className="text-center">
                <EditableText
                  value={quote.arabic}
                  onChange={(value) => updateQuote(index, 'arabic', value)}
                  className="text-2xl md:text-3xl font-bold text-white mb-6 leading-loose"
                  tag="p"
                  multiline
                  adminMode={adminMode}
                />

                <EditableText
                  value={quote.translation}
                  onChange={(value) => updateQuote(index, 'translation', value)}
                  className="text-lg text-white/80 mb-4 italic"
                  tag="p"
                  multiline
                  adminMode={adminMode}
                />

                <EditableText
                  value={quote.source}
                  onChange={(value) => updateQuote(index, 'source', value)}
                  className="text-sm text-[var(--color-primary)] font-semibold"
                  tag="p"
                  adminMode={adminMode}
                />

                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
