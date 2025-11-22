// Se você já tem um arquivo src/types/talhao.ts, pode migrar tudo para cá ou unificar.

export enum Permissao {
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    DEFAULT = 'DEFAULT',
    VIEW = 'VIEW'
}

export enum Medida {
    HECTARE = 'HECTARE',
    QUILOMETROS_QUADRADOS = 'QUILOMETROS_QUADRADOS',
    METROS_QUADRADOS = 'METROS_QUADRADOS'
}

// --- TALHÃO ---
export interface TalhaoDetalhadoDTO {
    id: string;
    nome: string;
    descricao: string;
    tamanho: number;
    medida: Medida;
    ativo: boolean;
    culturas: CulturaDTO[];
    operacoes: OperacaoDTO[];
    colaboradores: ColaboradorDTO[];
    sensorTemperatura?: SensorDTO;
    sensorUmidade?: SensorDTO;
}

// --- CULTURA ---
export interface CulturaDTO {
    id: string;
    nome: string;
    data: string; // ISO Date
}

export interface CulturaRequestDTO {
    nome: string;
    data: string;
    idTalhao: string;
}

// --- OPERAÇÃO ---
export interface OperacaoDTO {
    id: string;
    operacao: string;
    agente: string;
    dataHora: string;
}

export interface OperacaoRequestDTO {
    operacao: string;
    agente: string;
    dataHora: string; // ISO DateTime
    idTalhao: string;
}

// --- COLABORADOR ---
export interface ColaboradorDTO {
    id: string;
    email: string; // Frontend geralmente exibe email ou nome do usuário vinculado
    permissao: Permissao;
}

export interface ColaboradorRequestDTO {
    email: string;
    permissao: Permissao;
    idTalhao: string;
}

// --- SENSOR ---
export interface SensorDTO {
    id: string;
    ip: string;
    tipo: 'TEMPERATURA' | 'UMIDADE';
}

export interface SensorRequestDTO {
    ip: string;
    tipo: 'TEMPERATURA' | 'UMIDADE';
    idTalhao: string;
}