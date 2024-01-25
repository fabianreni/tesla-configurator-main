export interface TeslaModel {
    code: string;
    description: string;
    colors: Config[];
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
