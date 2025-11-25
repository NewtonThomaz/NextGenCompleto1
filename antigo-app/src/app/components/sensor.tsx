'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown, Plus } from 'lucide-react';

interface SensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'temperatura' | 'umidade' | null;
}

export default function SensorModal({ isOpen, onClose, type }: SensorModalProps) {
  const [viewState, setViewState] = useState<'select' | 'create'>('select');
  const [selectedSensor, setSelectedSensor] = useState('');
  
  // Inputs separados APENAS para o formulário visual
  const [newSensorIp, setNewSensorIp] = useState('');
  const [newSensorName, setNewSensorName] = useState('');

  // LISTA DE OBJETOS: Agora reflete o backend com UM CAMPO ÚNICO ('info')
  const [sensors, setSensors] = useState([
    { id: '1', info: 'Sensor A - 192.168.0.1' },
    { id: '2', info: 'Sensor B - 192.168.0.2' },
    { id: '3', info: 'Sensor C - 192.168.0.50' },
    { id: '4', info: 'Sensor Galpão - 192.168.0.101' },
    { id: '5', info: 'Sensor Externo - 192.168.0.102' },
  ]);

  if (!isOpen) return null;

  const handleClose = () => {
    setViewState('select');
    setNewSensorIp('');
    setNewSensorName('');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleRegister = () => {
    if (!newSensorIp || !newSensorName) return; 

    // LÓGICA DE UNIFICAÇÃO:
    // Pega os dois inputs visuais e salva em um único campo no objeto
    const infoUnificada = `${newSensorName} - ${newSensorIp}`;

    const newSensorObj = {
      id: Date.now().toString(),
      info: infoUnificada // Campo único que vai pro backend/lista
    };

    setSensors([...sensors, newSensorObj]);
    setSelectedSensor(newSensorObj.id);

    // Limpa inputs
    setNewSensorIp('');
    setNewSensorName('');
    setViewState('select');
  };

  const title = type === 'temperatura' ? 'Sensor de Temperatura' : 'Sensor de Umidade';

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 cursor-pointer"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 cursor-default">
        
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => viewState === 'create' ? setViewState('select') : handleClose()}
            className="text-[#6d8a44] hover:bg-[#6d8a44]/10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6d8a44]"
          >
            <ArrowLeft size={28} />
          </button>
          
          <h2 className="text-2xl font-bold text-[#6d8a44]">
            {viewState === 'select' ? 'Adicionando Sensor' : 'Novo Sensor'}
          </h2>
        </div>

        {viewState === 'select' && (
          <div className="space-y-6">
            <p className="text-gray-500 text-sm -mt-6 mb-4 ml-12">
              Configurando {title}
            </p>

            <div className="relative">
              <select 
                className="w-full appearance-none border border-gray-300 rounded-full py-3 px-4 text-gray-700 focus:outline-none focus:border-[#6d8a44] focus:ring-1 focus:ring-[#6d8a44] bg-white cursor-pointer shadow-sm"
                value={selectedSensor}
                onChange={(e) => setSelectedSensor(e.target.value)}
              >
                <option value="" disabled>Selecione o sensor</option>
                {/* Exibe o campo único 'info' */}
                {sensors.map((sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {sensor.info}
                  </option>
                ))}
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
              Registrar novo sensor
            </button>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={handleClose}
                className="flex-1 border border-[#6d8a44] text-gray-800 font-bold py-3 rounded-full hover:bg-gray-50 transition focus:ring-2 focus:ring-[#6d8a44] focus:ring-offset-1"
              >
                Cancelar
              </button>
              <button 
                onClick={handleClose} 
                className="flex-1 bg-[#6d8a44] text-white font-bold py-3 rounded-full hover:brightness-90 transition shadow-md focus:ring-2 focus:ring-[#6d8a44] focus:ring-offset-1"
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* Formulário visual com campos SEPARADOS */}
        {viewState === 'create' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 ml-2 mb-1">Endereço IP</label>
              <input 
                type="text" 
                placeholder="Ex: 192.168.0.100"
                value={newSensorIp}
                onChange={(e) => setNewSensorIp(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-3 px-4 text-gray-700 focus:outline-none focus:border-[#6d8a44] focus:ring-1 focus:ring-[#6d8a44] shadow-sm"
              />
            </div>
            
            <div>
               <label className="block text-sm font-medium text-gray-700 ml-2 mb-1">Identificação</label>
               <input 
                type="text" 
                placeholder="Ex: Sensor Galpão 1"
                value={newSensorName}
                onChange={(e) => setNewSensorName(e.target.value)}
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
                onClick={handleRegister}
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