import { WizardWidgetContainerProps } from "../typings/WizardWidgetProps";

type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export const getProperties = (
    values: WizardWidgetContainerProps,
    defaultProperties: Properties,
    _target: "web" | "desktop"
): PropertyGroup[] => {
    const configurationProperty = defaultProperties.find(propertyGroup => propertyGroup.caption === "Configuration");
    const designProperty = defaultProperties.find(propertyGroup => propertyGroup.caption === "Design");
    const headerActionProperty = defaultProperties.find(propertyGroup => propertyGroup.caption === "Header action");

    if (!configurationProperty || !configurationProperty.properties || !designProperty || !designProperty.properties) {
        return defaultProperties;
    }

    const isFixedWizardtype = values.wizardType === "FIXED";

    const configKeysToKeep = isFixedWizardtype
        ? [
              "wizardType",
              "headerOrientation",
              "fixedStepHeader",
              "fixedStepHeaderColor",
              "fixedWizardStepList",
              "activeStep",
              "clickedStep"
          ]
        : ["wizardType", "slidingWizardStepList", "activeStep", "clickedStep"];

    configurationProperty.properties = configurationProperty.properties.filter(property =>
        configKeysToKeep.includes(property.key)
    );

    designProperty.properties = designProperty.properties.filter(property =>
        isFixedWizardtype ? property.key === "navigationWidthFixed" : property.key !== "navigationWidthFixed"
    );

    return isFixedWizardtype
        ? [configurationProperty!, designProperty!]
        : [configurationProperty!, designProperty!, headerActionProperty!];
};
