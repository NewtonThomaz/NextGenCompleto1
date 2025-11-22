'use client'

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, LogOut, Moon, ScrollText, Info, LucideIcon } from 'lucide-react';

// Interfaces de Tipagem
interface Plot {
    id: number;
    name: string;
    isActive: boolean;
}

interface ToggleSwitchProps {
    value: boolean;
    onChange: (newValue: boolean) => void;
    activeColorClass: string;
}

interface SettingsItemProps {
    label: string;
    action?: (newValue?: boolean) => void;
    Icon?: LucideIcon; // O tipo para ícones Lucide
    isToggle?: boolean;
    initialValue?: boolean;
    showArrow?: boolean;
}

// Cores e Constantes
const PRIMARY_GREEN = '#609340'; 
const HEADER_BG = PRIMARY_GREEN;
const ACCENT_COLOR = 'text-white'; // Ajustado para contraste ou use uma classe de cor específica
const TOGGLE_ACTIVE_COLOR = 'bg-[#4CAF50]';

// Dados de exemplo para os talhões desativados
const initialPlots: Plot[] = [
    { id: 1, name: "Talhão 1 Cultivo", isActive: false },
    { id: 2, name: "Talhão 2 Cultivo", isActive: false },
    { id: 3, name: "Talhão 3 Cultivo", isActive: false },
    { id: 4, name: "Talhão 4 Cultivo", isActive: false },
];

/**
 * Componente reutilizável para o Toggle Switch.
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange, activeColorClass }) => (
    <div 
        className={`relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in-out cursor-pointer shadow-inner ${value ? activeColorClass : 'bg-gray-300'}`}
        onClick={() => onChange(!value)}
    >
        <span 
            className={`absolute left-0 top-0.5 w-5 h-5 bg-white rounded-full transition duration-200 ease-in-out transform shadow-md ${value ? 'translate-x-6' : 'translate-x-0.5'}`}
        ></span>
    </div>
);


/**
 * Componente de item de configuração reutilizável.
 */
const SettingsItem: React.FC<SettingsItemProps> = ({ label, action, Icon, isToggle = false, initialValue = false, showArrow = true }) => {
    const [value, setValue] = useState<boolean>(initialValue);

    const handleClick = () => {
        if (isToggle) {
            const newValue = !value;
            setValue(newValue);
            if (action) action(newValue);
        } else {
            if (action) action();
            console.log(`Navegando para: ${label}`);
        }
    };
    
    // Efeito de 'press' mais suave - Adicionado aspas que faltavam
    const itemClasses = "flex items-center justify-between p-4 rounded-xl shadow-lg cursor-pointer transition duration-150 active:scale-[0.98] bg-white";

    return (
        <div className={itemClasses} onClick={!isToggle ? handleClick : undefined}>
            <div className="flex items-center space-x-3">
                {/* Ícone adicionado para melhor visualização */}
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <span className="text-gray-800 font-medium">{label}</span>
            </div>
            
            {isToggle ? (
                <ToggleSwitch 
                    value={value} 
                    onChange={handleClick} 
                    activeColorClass={TOGGLE_ACTIVE_COLOR} 
                />
            ) : (
                showArrow && <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
        </div>
    );
};

// Componente Principal da Aplicação
const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [plots, setPlots] = useState<Plot[]>(initialPlots);

    const handlePlotToggle = (id: number, isActive: boolean) => {
        setPlots(plots.map(plot => 
            plot.id === id ? { ...plot, isActive } : plot
        ));
        console.log(`Talhão ${id} agora está ${isActive ? 'Ativo' : 'Desativado'}`);
    };

    const handleLogout = () => {
        // Simulação de modal de confirmação (em vez de alert())
        console.log("Usuário deslogado. Simulação de modal de confirmação.");
    };

    return (
        <main className="min-h-screen flex justify-center p-0" 
             style={{
                 backgroundColor: PRIMARY_GREEN,
                 fontFamily: 'Roboto, sans-serif'
             }}>
            
            {/* Contêiner de Largura */}
            <div className="w-full max-w-md bg-transparent">

                {/* HEADER (Barra Superior) */}
                <header className="flex items-center p-4 pt-8 pb-3 mb-6" style={{backgroundColor: HEADER_BG}}>
                    <ArrowLeft className="w-6 h-6 text-white cursor-pointer transition hover:text-white/80" />
                    <h1 className="flex-1 text-center text-2xl font-bold text-white tracking-wider">
                        CONFIGURAÇÕES
                    </h1>
                    {/* Placeholder para balancear o layout */}
                    <div className="w-6 h-6"></div> 
                </header>

                {/* CORPO DA PÁGINA */}
                <div className="p-4 pt-6 space-y-12  rounded-t-3xl min-h-[calc(100vh-80px)]">
                    
                    {/* SEÇÃO GERAL */}
                    <section className="space-y-4">
                        <h2 className={`text-xl font-extrabold ${ACCENT_COLOR} mb-4`}>GERAL</h2>
                        
                        <SettingsItem 
                            label="Modo Escuro" 
                            Icon={Moon} 
                            isToggle={true} 
                            initialValue={isDarkMode} 
                            action={(val) => setIsDarkMode(!!val)}
                            showArrow={false}
                        />
                        
                        <SettingsItem 
                            label="Políticas de Uso e Privacidade" 
                            Icon={ScrollText} 
                            action={() => {}} 
                        />
                        
                        <SettingsItem 
                            label="Saiba mais" 
                            Icon={Info} 
                            action={() => {}} 
                        />
                    </section>

                    {/* SEÇÃO ATIVAR TALHÕES DESATIVADOS */}
                    <section className="space-y-4">
                        <h2 className={`text-xl font-extrabold ${ACCENT_COLOR} mb-4`}>GERENCIAMENTO DE TALHÕES</h2>
                        
                        {/* CARD DA LISTA DE TALHÕES */}
                        <section className="bg-white p-4 rounded-xl shadow-lg space-y-3" aria-label="Lista de Talhões para Ativação">
                            {plots.map(plot => (
                                <div key={plot.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-200">
                                    <span className="text-gray-800 font-medium">{plot.name}</span>
                                    <ToggleSwitch
                                        value={plots.find(p => p.id === plot.id)?.isActive || false}
                                        onChange={(isActive) => handlePlotToggle(plot.id, isActive)}
                                        activeColorClass={TOGGLE_ACTIVE_COLOR}
                                    />
                                </div>
                            ))}
                        </section>
                    </section>
                    
                    {/* BOTÃO SAIR */}
                    <div className="pt-4 pb-8">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-full shadow-xl transition duration-300 transform hover:scale-[1.01]"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sair da Conta
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default App;