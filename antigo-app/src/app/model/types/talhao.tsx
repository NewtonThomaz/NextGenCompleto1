// Enum igual ao do Java
export enum Medida {
    HECTARE = 'HECTARE',
    QUILOMETROS_QUADRADOS = 'QUILOMETROS_QUADRADOS',
    METROS_QUADRADOS = 'METROS_QUADRADOS'
}

export interface TalhaoRequestDTO {
    nome: string;
    descricao: string;
    tamanho: number;
    idUsuario: string;
    medida: Medida;
    idsCulturas: string[];
    idsOperacoes: string[];
    idsColaboradores: string[];
}

export interface TalhaoResponseDTO {
    id: string;
    nome: string;
    descricao: string;
    tamanho: number;
    medida: Medida;
    nomeResponsavel: string;
    nomesCulturas: string[];
    descricoesOperacoes: string[];
    ativo: boolean;
}