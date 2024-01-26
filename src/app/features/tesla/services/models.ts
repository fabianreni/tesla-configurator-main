export interface TeslaModel {
    code: string;
    description: string;
    colors: Color[];
}

export interface Color {
    code: string;
    description: string;
    price: number;
}

export interface TeslaType {
    code: string;
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
}

export interface Config {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

export class ConfiguredTesla {
    modelCode: string | null = null;
    modelDescription: string | null = null;
    modelColore: Color | null = null;
    typeCode: string | null = null;
    typeConfig: Config | null = null;
    towHitch: boolean | null = null;
    yoke: boolean | null = null;
}

