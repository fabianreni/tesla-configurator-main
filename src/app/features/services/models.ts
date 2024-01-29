export interface TeslaModelConfig {
    code: string;
    description: string;
    colors: Color[];
}

export interface Color {
    code: string;
    description: string;
    price: number;
}

export interface TeslaModelType {
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
