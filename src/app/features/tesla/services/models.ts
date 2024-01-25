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

export interface ConfiguredTesla {
    modelCode: string;
    modelDescription: string;
    modelColore: Color
    typeCode: string;
    typeConfig: Config;
    towHitch: boolean;
    yoke: boolean;
}

