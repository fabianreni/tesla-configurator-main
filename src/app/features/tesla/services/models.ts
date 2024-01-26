export class TeslaModelConfig {
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
        this.resetTotalPrice();
        this.totalCost += this.totalExtraCost();

        if (this.modelColor) {
            this.totalCost += this.modelColor.price;
        }

        if (this.typeConfig) {
            this.totalCost += this.typeConfig.price;
        }
    }

    private totalExtraCost(): number {
        let totalExtraCost = 0;

        if (this.yoke) {
            totalExtraCost += this.extraCost;
        }
        if (this.towHitch) {
            totalExtraCost += this.extraCost;
        }

        return totalExtraCost;
    }

    private resetTotalPrice(): void {
        this.totalCost = 0;
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

    reset(): void {
        this.modelCode = null;
        this.modelDescription = null;
        this.modelColor = null;
        this.typeConfig = null;
        this.towHitch = false;
        this.yoke = false;
        this.totalCost = 0;
        this.extraCost = 1000;
    }
}
