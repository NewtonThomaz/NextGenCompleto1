'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Eye, Trash2, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Interface para os dados do talhão
interface TalhaoData {
  id: string;
  nome: string;
  descricao: string | null;
  tamanho: number | string;
  medida: string;
}

// Interface para Colaboradores
interface Collaborator {
  id: string;
  nome: string;
  email: string;
  foto: string;
  role: string;
}

export default function TalhaoDetail() {
  const router = useRouter();
  
  // --- LISTA DE COLABORADORES ---
  const initialCollaborators: Collaborator[] = [
    { id: '4', nome: 'Curie', email: 'marie.curie@radioactive.com', foto: 'https://i.pravatar.cc/150?u=4', role: 'ADMIN' },
    { id: '6', nome: 'Lovelace', email: 'ada@code.com', foto: 'https://i.pravatar.cc/150?u=6', role: 'ROOT' },
    { id: '7', nome: 'Darwin', email: 'charles@evolution.com', foto: 'https://i.pravatar.cc/150?u=7', role: 'USER' },
    { id: '8', nome: 'Newton', email: 'isaac@gravity.com', foto: 'https://i.pravatar.cc/150?u=8', role: 'USER' }
  ];

  // --- OBJETO DE DADOS ---
  const dadosIniciais: TalhaoData = {
    id: '1',
    nome: 'Talhão A1 Cultivo Rotativo',
    descricao: 'Área destinada ao cultivo de grãos, próxima ao reservatório de irrigação, terreno levemente ondulado. Essa topografia suave facilita a mecanização e promove uma excelente drenagem natural.',
    tamanho: 12.5,
    medida: 'Hectares'
  };

  const [talhao, setTalhao] = useState<TalhaoData>(dadosIniciais);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setTalhao(prev => ({
      ...prev,
      [name]: type === 'number' ? value : value
    }));
  };

  const [showTempGraph, setShowTempGraph] = useState(true);
  const [showHumidityGraph, setShowHumidityGraph] = useState(true);

  const tempGraphic = [
    { dia: '12', temperatura: 25 },
    { dia: '13', temperatura: 22 },
    { dia: '14', temperatura: 28 },
    { dia: '15', temperatura: 26 },
    { dia: '16', temperatura: 30 },
    { dia: '17', temperatura: 24 },
    { dia: '18', temperatura: 27 },
  ];

  const humidityGraphic = [
    { dia: '12', umidade: 60 },
    { dia: '13', umidade: 55 },
    { dia: '14', umidade: 65 },
    { dia: '15', umidade: 62 },
    { dia: '16', umidade: 70 },
    { dia: '17', umidade: 58 },
    { dia: '18', umidade: 63 },
  ];

  const fullHistory = [
    { id: '1', name: 'Soja' },
    { id: '2', name: 'Trigo' },
    { id: '3', name: 'Milho' },
  ];

  const currentCulture = fullHistory.length > 0 ? fullHistory[0] : null;
  const previousCultures = currentCulture
    ? fullHistory.filter(item => item.id !== currentCulture.id)
    : [];

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gray-50 flex justify-center py-8 px-4 font-sans">
      <section className="w-full max-w-lg md:max-w-5xl space-y-5">

        <header className="flex items-center">
          <button
            onClick={() => router.back()}
            aria-label="Voltar"
            className="text-[#556B2F] hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-offset-2"
          >
            <ArrowLeft size={32} strokeWidth={2.5} />
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Layout de Colunas">

          <section className="space-y-5" aria-label="Informações Principais">

            <section className="bg-white rounded-2xl shadow-md p-5">
              <label htmlFor="nome-talhao" className="text-sm font-bold text-gray-800 mb-1 block">
                Nome do Talhão
              </label>
              <input
                id="nome-talhao"
                name="nome"
                type="text"
                value={talhao.nome}
                onChange={handleChange}
                className="w-full text-2xl font-bold text-[#556B2F] outline-none bg-transparent border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all placeholder-[#556B2F]/50"
              />
            </section>

            <article className="bg-white rounded-2xl shadow-md p-5">
              <label htmlFor="descricao" className="text-sm font-bold text-gray-800 mb-2 block">
                Descrição <span className="text-gray-400 font-normal text-xs">(Opcional)</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={5}
                value={talhao.descricao || ''}
                onChange={handleChange}
                placeholder="Insira uma descrição (opcional)"
                className="w-full text-sm text-gray-600 leading-relaxed text-justify outline-none bg-transparent resize-none border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all placeholder:text-gray-300"
              />
            </article>

            <section className="grid grid-cols-3 gap-3" aria-label="Estatísticas do Talhão">

              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <label htmlFor="hectares" className="text-xs font-bold text-gray-800 mt-1 capitalize">
                  {talhao.medida}
                </label>
                <input
                  id="hectares"
                  name="tamanho"
                  type="number" 
                  step="0.01"
                  value={talhao.tamanho}
                  onChange={handleChange}
                  className="w-full text-3xl font-bold text-[#556B2F] text-center outline-none bg-transparent p-0 border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="h-6 w-full invisible" aria-hidden="true"></span>
              </article>

              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <h3 className="text-xs font-bold text-gray-800 mt-1">Colaboradores</h3>
                
                {/* CONTAGEM DINÂMICA BASEADA NO ARRAY */}
                <span className="text-3xl font-bold text-[#556B2F]">
                  {initialCollaborators.length}
                </span>

                <a href='/talhoes/[id]/colaboradores'
                className="flex items-center gap-1 border border-[#7FA050] text-[#556B2F] px-2 py-1 rounded-full text-[10px] font-semibold hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F] h-6">
                  <Plus size={10} /> adicionar
                </a>
              </article>

              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <h3 className="text-xs font-bold text-gray-800 mt-1">Cultura Atual</h3>
                <span className="text-2xl font-bold text-[#556B2F] truncate max-w-full px-1">
                  {currentCulture ? currentCulture.name : '-'}
                </span>
                <span className="h-6 w-full invisible" aria-hidden="true"></span>
              </article>
            </section>

            {previousCultures && previousCultures.length > 0 && (
              <section className="bg-white rounded-2xl shadow-md p-5">
                <h2 className="text-xs font-bold text-gray-800 mb-4">Culturas Anteriores</h2>
                <ul className="flex justify-around items-center list-none p-0 m-0">
                  {previousCultures.map((culture, index) => (
                    <React.Fragment key={culture.id}>
                      <li className="text-center">
                        <h3 className="text-2xl font-bold text-[#556B2F]">{culture.name}</h3>
                      </li>
                      {index < previousCultures.length - 1 && (
                        <li aria-hidden="true" className="w-px h-10 bg-gray-200"></li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </section>
            )}
          </section>

          <section className="space-y-5" aria-label="Histórico e Sensores">

            <a href='/talhoes/[id]/operacoes' className="w-full bg-white rounded-xl shadow-md flex items-center overflow-hidden h-14 group active:scale-[0.99] transition-transform focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-offset-1">
              <span className="bg-[#7FA050] h-full w-16 flex items-center justify-center group-hover:bg-[#6d8a44] transition-colors">
                <Eye className="text-white" size={28} aria-hidden="true" />
              </span>
              <span className="flex-1 flex justify-center items-center text-[#556B2F] font-semibold text-sm sm:text-base">
                visualizar historico de operações
              </span>
            </a>

            <h2 className="text-lg font-bold text-black">Sensores</h2>

            <section className="bg-white rounded-2xl shadow-md p-5 space-y-4">
              <fieldset className="space-y-2 border-none m-0 p-0">
                <div className="flex justify-between items-center">
                  <label htmlFor="temp-sensor" className="text-[#556B2F] text-sm font-bold block">
                    Temperatura
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Ver Gráfico</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTempGraph}
                        onChange={() => setShowTempGraph(!showTempGraph)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7FA050]"></div>
                      <span className="ml-2 text-xs font-medium text-gray-400 select-none">
                        {showTempGraph ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>
                </div>

                {!showTempGraph && (
                  <span className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden h-12 focus-within:ring-2 focus-within:ring-[#556B2F] focus-within:border-transparent animate-in fade-in zoom-in-95 duration-200">
                    <span className="flex-1 px-4 text-gray-600 outline-none w-full h-full bg-transparent flex items-center " id="temp-sensor">
                      25°C
                    </span>
                    <button type="button" className="bg-[#7FA050] text-white px-6 font-medium hover:bg-[#6d8a44] transition-colors h-full">
                      Editar
                    </button>
                  </span>
                )}

                {showTempGraph && (
                  <div className="mt-4 h-48 w-full bg-gray-50 rounded-lg p-2 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tempGraphic}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} labelStyle={{ color: '#374151', fontWeight: 'bold' }} />
                        <Line type="monotone" dataKey="temperatura" stroke="#556B2F" strokeWidth={3} dot={{ r: 4, fill: '#556B2F', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#7FA050' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </fieldset>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-5 space-y-4">
              <fieldset className="space-y-2 border-none m-0 p-0">
                <div className="flex justify-between items-center">
                  <label htmlFor="humidity-sensor" className="text-[#556B2F] text-sm font-bold block">
                    Umidade
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Ver Gráfico</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showHumidityGraph}
                        onChange={() => setShowHumidityGraph(!showHumidityGraph)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7FA050]"></div>
                      <span className="ml-2 text-xs font-medium text-gray-400 select-none">
                        {showHumidityGraph ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>
                </div>

                {!showHumidityGraph && (
                  <span className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden h-12 focus-within:ring-2 focus-within:ring-[#556B2F] focus-within:border-transparent animate-in fade-in zoom-in-95 duration-200">
                    <span className="flex-1 px-4 text-gray-600 outline-none w-full h-full bg-transparent flex items-center " id="humidity-sensor">
                      60%
                    </span>
                    <button type="button" className="bg-[#7FA050] text-white px-6 font-medium hover:bg-[#6d8a44] transition-colors h-full">
                      Editar
                    </button>
                  </span>
                )}

                {showHumidityGraph && (
                  <div className="mt-4 h-48 w-full bg-gray-50 rounded-lg p-2 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={humidityGraphic}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} labelStyle={{ color: '#374151', fontWeight: 'bold' }} />
                        <Line type="monotone" dataKey="umidade" stroke="#556B2F" strokeWidth={3} dot={{ r: 4, fill: '#556B2F', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#7FA050' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </fieldset>
            </section>

            <footer className="pt-4 pb-8 flex flex-col sm:flex-row gap-3 md:justify-end">
              <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-[#7FA050] text-white font-bold text-lg hover:bg-[#6d8a44] active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-offset-2 w-full md:w-auto shadow-md">
                Salvar <Save size={24} aria-hidden="true" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border-2 border-red-500 text-red-500 font-bold text-lg hover:bg-red-50 active:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full md:w-auto">
                Excluir <Trash2 size={24} aria-hidden="true" />
              </button>
            </footer>

          </section>
        </section>
      </section>
    </main>
  );
}