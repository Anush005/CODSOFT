import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface MobileDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileDetailOverlay({ isOpen, onClose, children }: MobileDetailOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <span className="text-sm font-display font-bold text-foreground">Face Details</span>
          </div>
          <div className="px-4 py-5 space-y-4 pb-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
