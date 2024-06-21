export const parse = (code: string) => {
    const regex = /import\s(.*)\sfrom\s"(.*)";/g;
    const imports = code.match(regex);
    return imports;
    }

export const parseName = ({firstname, lastname}: any) => {
    return `${firstname} ${lastname}`;
}

export const parseProjectProps = (prop: string) => {
    const translations: Record<string, string> = {
        projectCategory: "Categoría del Proyecto",
        fundingCap: "Límite de Financiamiento",
        mechatronicComponents: "Componentes Mecatrónicos",
        controlPlatforms: "Plataformas de Control",
        designMethodology: "Método de Diseño",
        hasAI: "Incluye IA",
        resourceOptimization: "Optimización de Recursos",
        location: "Ubicación",
        manufacturingTechnology: "Tecnología de Fabricación",
        developmentStatus: "Estado de Desarrollo",
        riskLevel: "Nivel de Riesgo",
        rewardType: "Tipo de Recompensa",
        returnPeriod: "Plazo de Retorno",
        competitiveLandscape: "Panorama Competitivo",
        isActive: "Activo"
      };

    return translations[prop] || prop;
}