'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus, X } from 'lucide-react';

interface NewCultureModalProps {
  isOpen: boolean;
  onClose: () => void;
  talhaoId: string;
}

export default function NewCultureModal({ isOpen, onClose, talhaoId }: NewCultureModalProps) {
  // Controle interno para saber se está selecionando ou criando
  const [viewState, setViewState] = useState<'select' | 'create'>('select');
  const [selectedCulture, setSelectedCulture] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setViewState('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* CABEÇALHO */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => viewState === 'create' ? setViewState('select') : handleClose()}
            className="text-[#6d8a44] hover:bg-[#6d8a44]/10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6d8a44]"
          >
            <ArrowLeft size={28} />
          </button>
          
          <h2 className="text-2xl font-bold text-[#6d8a44]">
            {viewState === 'select' ? 'Iniciar Novo Cultivo' : 'Criando nova cultura'}
          </h2>
        </div>

        {/* --- ESTADO 1: SELECIONAR CULTURA --- */}
        {viewState === 'select' && (
          <div className="space-y-6">
            <div className="relative">
              <select 
                className="w-full appearance-none border border-gray-300 rounded-full py-3 px-4 text-gray-700 focus:outline-none focus:border-[#6d8a44] focus:ring-1 focus:ring-[#6d8a44] bg-white cursor-pointer shadow-sm"
                value={selectedCulture}
                onChange={(e) => setSelectedCulture(e.target.value)}
              >
                <option value="" disabled>Nome da cultura</option>
                <option value="milho">Milho</option>
                <option value="soja">Soja</option>
                <option value="trigo">Trigo</option>
                <option value="cafe">Café</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d8a44] pointer-events-none" />
            </div>

            <button 
              onClick={() => setViewState('create')}
              className="flex items-center gap-2 text-[#6d8a44] text-sm font-medium hover:underline pl-1 group"
            >
              <div className="bg-[#6d8a44] text-white rounded-full p-0.5 group-hover:brightness-90 transition-all">
                <Plus size={14} />
              </div>
              Registrar uma nova cultura
            </button>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={handleClose}
                className="flex-1 border border-[#6d8a44] text-gray-800 font-bold py-3 rounded-full hover:bg-gray-50 transition focus:ring-2 focus:ring-[#6d8a44] focus:ring-offset-1"
              >
                Cancelar
              </button>
              <button 
                className="flex-1 bg-[#6d8a44] text-white font-bold py-3 rounded-full hover:brightness-90 transition shadow-md focus:ring-2 focus:ring-[#6d8a44] focus:ring-offset-1"
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* --- ESTADO 2: CRIAR NOVA CULTURA --- */}
        {viewState === 'create' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
            <div>
              <input 
                type="text" 
                autoFocus
                placeholder="Nome da cultura"
                className="w-full border border-gray-300 rounded-full py-3 px-4 text-gray-700 focus:outline-none focus:border-[#6d8a44] focus:ring-1 focus:ring-[#6d8a44] shadow-sm"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setViewState('select')}
                className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-full hover:bg-gray-200 transition focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
              >
                Cancelar
              </button>
              <button 
                className="flex-1 bg-[#6d8a44] text-white font-bold py-3 rounded-full hover:brightness-90 transition shadow-md focus:ring-2 focus:ring-[#6d8a44] focus:ring-offset-1"
              >
                Registrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}