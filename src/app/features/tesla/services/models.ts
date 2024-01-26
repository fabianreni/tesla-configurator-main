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
    modelColor: Color | null = null;
    typeConfig: Config | null = null;
    towHitch: boolean | null = null;
    yoke: boolean | null = null;
    totalCost: number = 0;
    extraCost: number = 1000;

    setTotalPrice(): void {
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
