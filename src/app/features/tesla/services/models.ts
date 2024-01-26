export class TeslaModel {
    code: string;
    description: string;
    colors: Color[];

    constructor(code: string, description: string, colors: Color[]) {
        this.code = code;
        this.description = description;
        this.colors = colors;
    }
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
    modelCode: string | null;
    modelDescription: string | null;
    modelColor: Color | null;
    typeConfig: Config | null;
    towHitch: boolean;
    yoke: boolean;
    totalCost: number;
    extraCost: number;

    constructor() {
        this.modelCode = null;
        this.modelDescription = null;
        this.modelColor = null;
        this.typeConfig = null;
        this.towHitch = false;
        this.yoke = false;
        this.totalCost = 0;
        this.extraCost = 1000;
    }

    setTotalPrice(): void {
        this.totalCost = 0;
        if (this.yoke) {
            this.totalCost += this.extraCost;
        }
        if (this.towHitch) {
            this.totalCost += this.extraCost;
        }

        if (this.modelColor) {
            this.totalCost += this.modelColor.price;
        }

        if (this.typeConfig) {
            this.totalCost += this.typeConfig.price;
        }
    }

    getIsModelConfigSelected(): boolean {
        if (this.modelCode && this.modelColor) {
            return true;
        }

        return false;
    }

    getIsModelTypeSelected(): boolean {
        if (this.typeConfig) {
            return true;
        }

        return false;
    }
}
