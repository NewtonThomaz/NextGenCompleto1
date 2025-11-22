'use client';

import React from 'react';
import { ArrowLeft, Plus, Eye, Trash2, Save } from 'lucide-react';

export default function TalhaoDetail() {
  const fullHistory = [
    { id: '1', name: 'Soja', year: '2025' },
    // { id: '2', name: 'Trigo', year: '2023' },
    // { id: '3', name: 'Milho', year: '2022' },
  ];

  const currentCulture = fullHistory.length > 0 ? fullHistory[0] : null;

  const previousCultures = currentCulture 
    ? fullHistory.filter(item => item.id !== currentCulture.id)
    : [];

  return (
    // AJUSTE AQUI: Substituído min-h-screen por min-h-[calc(100vh-5rem)]
    // Isso desconta a altura média de um header (5rem = 80px) para evitar rolagem dupla/estouro
    <main className="min-h-[calc(100vh-5rem)] bg-gray-50 flex justify-center py-8 px-4 font-sans">
      <section className="w-full max-w-lg md:max-w-5xl space-y-5">
        
        <header className="flex items-center py-2">
          <a href='/home' 
            aria-label="Voltar"
            className="text-[#556B2F] hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-offset-2"
          >
            <ArrowLeft size={32} strokeWidth={2.5} />
          </a>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Layout de Colunas">
          
          {/* Coluna da Esquerda */}
          <section className="space-y-5" aria-label="Informações Principais">
            
            {/* Nome do Talhão - Input */}
            <section className="bg-white rounded-2xl shadow-md p-5">
              <label htmlFor="nome-talhao" className="text-sm font-bold text-gray-800 mb-1 block">
                Nome do Talhão
              </label>
              <input
                id="nome-talhao"
                type="text"
                defaultValue="Talhão A1 Cultivo Rotativo"
                className="w-full text-2xl font-bold text-[#556B2F] outline-none bg-transparent border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all placeholder-[#556B2F]/50"
              />
            </section>

            {/* Descrição - Textarea */}
            <article className="bg-white rounded-2xl shadow-md p-5">
              <label htmlFor="descricao" className="text-sm font-bold text-gray-800 mb-2 block">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={5}
                defaultValue="Área destinada ao cultivo de grãos, próxima ao reservatório de irrigação, terreno levemente ondulado. Essa topografia suave facilita a mecanização e promove uma excelente drenagem natural."
                className="w-full text-sm text-gray-600 leading-relaxed text-justify outline-none bg-transparent resize-none border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all"
              />
            </article>

            {/* Estatísticas */}
            <section className="grid grid-cols-3 gap-3" aria-label="Estatísticas do Talhão">
              
              {/* Hectares - Input */}
              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <label htmlFor="hectares" className="text-xs font-bold text-gray-800 mt-1">
                  Hectares
                </label>
                <input
                  id="hectares"
                  type="text"
                  defaultValue="12,5"
                  className="w-full text-3xl font-bold text-[#556B2F] text-center outline-none bg-transparent p-0 border-b-2 border-transparent focus:border-[#556B2F]/20 transition-all"
                />
                <span className="h-6 w-full invisible" aria-hidden="true"></span>
              </article>

              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <h3 className="text-xs font-bold text-gray-800 mt-1">Colaboradores</h3>
                <span className="text-3xl font-bold text-[#556B2F]">20</span>
                <button className="flex items-center gap-1 border border-[#7FA050] text-[#556B2F] px-2 py-1 rounded-full text-[10px] font-semibold hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#556B2F] h-6">
                  <Plus size={10} /> adicionar
                </button>
              </article>

              <article className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-between aspect-square">
                <h3 className="text-xs font-bold text-gray-800 mt-1">Cultura Atual</h3>
                <span className="text-2xl font-bold text-[#556B2F] truncate max-w-full px-1">
                  {currentCulture ? currentCulture.name : '-'}
                </span>
                <span className="h-6 w-full invisible" aria-hidden="true"></span>
              </article>
            </section>
          </section>

          {/* Coluna da Direita */}
          <section className="space-y-5" aria-label="Histórico e Sensores">
            
            {previousCultures && previousCultures.length > 0 && (
              <section className="bg-white rounded-2xl shadow-md p-5">
                <h2 className="text-xs font-bold text-gray-800 mb-4">Culturas Anteriores</h2>
                <ul className="flex justify-around items-center list-none p-0 m-0">
                  {previousCultures.map((culture, index) => (
                    <React.Fragment key={culture.id}>
                      <li className="text-center">
                        <h3 className="text-2xl font-bold text-[#556B2F]">{culture.name}</h3>
                        <time className="text-xs font-semibold text-gray-700" dateTime={culture.year}>
                          ({culture.year})
                        </time>
                      </li>
                      
                      {index < previousCultures.length - 1 && (
                        <li aria-hidden="true" className="w-px h-10 bg-gray-200"></li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </section>
            )}

            <button className="w-full bg-white rounded-xl shadow-md flex items-center overflow-hidden h-14 group active:scale-[0.99] transition-transform focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:ring-offset-1">
              <span className="bg-[#7FA050] h-full w-16 flex items-center justify-center group-hover:bg-[#6d8a44] transition-colors">
                <Eye className="text-white" size={28} aria-hidden="true" />
              </span>
              <span className="flex-1 flex justify-center items-center text-[#556B2F] font-semibold text-sm sm:text-base">
                visualizar historico de operações
              </span>
            </button>

            <form className="bg-white rounded-2xl shadow-md p-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-lg font-bold text-black">Sensores</h2>

              <fieldset className="space-y-1 border-none m-0 p-0">
                <label htmlFor="temp-sensor" className="text-[#556B2F] text-sm font-bold block">
                  Temperatura
                </label>
                <span className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden h-12 focus-within:ring-2 focus-within:ring-[#556B2F] focus-within:border-transparent">
                  <input 
                    id="temp-sensor"
                    type="text" 
                    defaultValue="192.168.0.1" 
                    className="flex-1 px-4 text-gray-600 outline-none w-full h-full bg-transparent"
                  />
                  <button type="button" className="bg-[#7FA050] text-white px-6 font-medium hover:bg-[#6d8a44] transition-colors h-full">
                    Editar
                  </button>
                </span>
              </fieldset>

              <fieldset className="space-y-1 border-none m-0 p-0">
                <label htmlFor="humidity-sensor" className="text-[#556B2F] text-sm font-bold block">
                  Umidade
                </label>
                <span className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden h-12 focus-within:ring-2 focus-within:ring-[#556B2F] focus-within:border-transparent">
                  <input 
                    id="humidity-sensor"
                    type="text" 
                    defaultValue="192.168.1.1" 
                    className="flex-1 px-4 text-gray-600 outline-none w-full h-full bg-transparent"
                  />
                  <button type="button" className="bg-[#7FA050] text-white px-6 font-medium hover:bg-[#6d8a44] transition-colors h-full">
                    Editar
                  </button>
                </span>
              </fieldset>
            </form>

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