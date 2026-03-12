import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Smile, Calendar, Tag, X, Check } from 'lucide-react';
import type { FaceResult } from '@/lib/faceDetection';

interface FaceDetailPanelProps {
  face: FaceResult | null;
  recognizedName: string | undefined;
  onLabelFace: (id: number, name: string) => void;
  onClose: () => void;
}

export default function FaceDetailPanel({ face, recognizedName, onLabelFace, onClose }: FaceDetailPanelProps) {
  const [nameInput, setNameInput] = useState('');

  if (!face) return null;

  const topExpression = Object.entries(face.expressions).sort((a, b) => b[1] - a[1])[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className="bg-card border border-border rounded-2xl p-4 sm:p-5 space-y-4 shadow-soft">
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-display font-bold text-foreground">
            Face #{face.id + 1}
          </h3>
          




          
        </div>

        {/* Identity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <User size={12} /> Identity
          </div>
          {recognizedName ?
          <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-3 py-2">
              <span className="text-primary font-semibold text-sm">{recognizedName}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">matched</span>
            </div> :

          <div className="flex gap-2">
              <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter name..."
              className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && nameInput.trim()) {
                  onLabelFace(face.id, nameInput.trim());
                  setNameInput('');
                }
              }} />
            
              <button
              onClick={() => {
                if (nameInput.trim()) {
                  onLabelFace(face.id, nameInput.trim());
                  setNameInput('');
                }
              }}
              className="bg-primary text-primary-foreground rounded-xl px-3 py-2 hover:opacity-90 transition-opacity shadow-soft">
              
                <Check size={16} />
              </button>
            </div>
          }
        </div>

        {/* Age & Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Calendar size={12} /> Age
            </div>
            <p className="text-xl font-display font-bold text-foreground">~{face.age}</p>
          </div>
          <div className="bg-secondary rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Tag size={12} /> Gender
            </div>
            <p className="text-xl font-display font-bold text-foreground capitalize">{face.gender}</p>
            <p className="text-xs text-muted-foreground">{(face.genderProbability * 100).toFixed(0)}%</p>
          </div>
        </div>

        {/* Expression */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            <Smile size={12} /> Expressions
          </div>
          <div className="space-y-2">
            {Object.entries(face.expressions).
            sort((a, b) => b[1] - a[1]).
            slice(0, 4).
            map(([expr, val]) =>
            <div key={expr} className="flex items-center gap-2">
                  <span className="text-xs w-20 capitalize text-secondary-foreground font-medium">{expr}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(val as number) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${expr === topExpression[0] ? 'bg-primary' : 'bg-accent'}`} />
                
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right font-medium">
                    {((val as number) * 100).toFixed(0)}%
                  </span>
                </div>
            )}
          </div>
        </div>

        {/* Coordinates */}
        <div className="text-xs text-muted-foreground space-y-0.5 pt-3 border-t border-border">
          <p>Position: ({Math.round(face.box.x)}, {Math.round(face.box.y)})</p>
          <p>Dimensions: {Math.round(face.box.width)} × {Math.round(face.box.height)}px</p>
        </div>
      </motion.div>
    </AnimatePresence>);

}