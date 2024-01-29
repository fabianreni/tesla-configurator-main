import { Color, Config } from "./models";

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

    getIsModelConfigSelected(): boolean {
        if (this.modelCode && this.modelColor) {
            return true;
        }

        return false;
    }

    getIsModelOptionConfigSelected(): boolean {
        if (this.typeConfig) {
            return true;
        }

        return false;
    }

    reset(): void {
        this.modelCode = null;
        this.modelDescription = null;
        this.resetColor();
        this.typeConfig = null;
        this.towHitch = false;
        this.yoke = false;
        this.totalCost = 0;
        this.extraCost = 1000;
    }

    resetColor(): void {
        this.modelColor = null;
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
}