import { Color, Config, TeslaModelConfig } from "./models";

export class ConfiguredTesla {
    readonly extraCost = 1000;

    modelCode: string | null;
    modelDescription: string | null;
    modelColor: Color | null;
    config: Config | null;
    towHitch: boolean;
    yoke: boolean;
    totalCost: number;

    constructor() {
        this.modelCode = null;
        this.modelDescription = null;
        this.modelColor = null;
        this.config = null;
        this.towHitch = false;
        this.yoke = false;
        this.totalCost = 0;
    }

    getIsModelConfigSelected(): boolean {
        if (this.modelCode && this.modelColor) {
            return true;
        }

        return false;
    }

    getIsModelOptionConfigSelected(): boolean {
        if (this.config) {
            return true;
        }

        return false;
    }

    reset(): void {
        this.modelCode = null;
        this.modelDescription = null;
        this.resetColorAndOptionConfig();
    }

    resetColorAndOptionConfig(): void {
        this.modelColor = null;
        this.resetOptionConfig();
        this.totalCost = 0;
    }

    resetOptionConfig(): void {
        this.config = null;
        this.towHitch = false;
        this.yoke = false;
    }

    setModelAndDescription(selectedTeslaModel: TeslaModelConfig): void {
        this.modelCode = selectedTeslaModel.code;
        this.modelDescription = selectedTeslaModel.description;
        this.setTotalPrice();
    }

    setSelectedTeslaColor(selectedTeslaColor: Color): void {
        this.modelColor = selectedTeslaColor;
        this.setTotalPrice();
    }

    setSelectedTeslaType(selectedTeslaType: Config): void {
        this.config = selectedTeslaType;
        this.setTotalPrice();
    }

    setConfiguredTesla(selectedTeslaType: Config): void {
        this.config = selectedTeslaType;
        this.setTotalPrice();
    }

    setTowHitch(towHitch: boolean): void {
        this.towHitch = towHitch;
    }

    setTotalPrice(): void {
        this.resetTotalPrice();
        this.totalCost += this.totalExtraCost();

        if (this.modelColor) {
            this.totalCost += this.modelColor.price;
        }

        if (this.config) {
            this.totalCost += this.config.price;
        }
    }

    setYoke(yoke: boolean): void {
        this.yoke = yoke;
    }

    private resetTotalPrice(): void {
        this.totalCost = 0;
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
}