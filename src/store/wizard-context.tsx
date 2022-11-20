import React, { createElement, ReactElement, ReactFragment, useState } from "react";
import { WizardWidgetContainerProps } from "../../typings/WizardWidgetProps";
import WizardStepObject from "../objects/WizardStepObject";
import Big from "big.js";

export interface WizardContextProviderProps {
    children: ReactElement | ReactElement[];
    widgetProps: WizardWidgetContainerProps;
}

export interface WizardContextType {
    widgetProps: WizardWidgetContainerProps;
    stepWidth: number;
    onSetStepWidth: (width: number | undefined) => void;
    wizardSteps: WizardStepObject[];
    onCreateWizardSteps: () => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    onActiveStepChange: (activeStep: number) => void;
}

export const WizardContext = React.createContext<WizardContextType>({} as WizardContextType);

const WizardContextProvider = (props: WizardContextProviderProps): JSX.Element => {
    const [stepWidth, setStepWidth] = useState(10000);
    const [wizardSteps, setWizardSteps] = useState<WizardStepObject[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const onSetStepWidth = (width: number | undefined): void => {
        setStepWidth(() =>
            width ? width - (wizardSteps.length - 1) * props.widgetProps.headerWidthSlidingInactive : 10000
        );
    };

    const onActiveStepChange = (clickedStep: number): void => {
        if (!props.widgetProps.isHeaderClickable) {
            return;
        }
        props.widgetProps.clickedStep.setValue(new Big(clickedStep));
        if (props.widgetProps.onActiveStepChange) {
            props.widgetProps.onActiveStepChange.execute();
        }
    };

    const onCreateWizardSteps = (): void => {
        const wizardStepObjects =
            props.widgetProps.wizardType === "FIXED"
                ? props.widgetProps.fixedWizardStepList.map((step, index) => {
                      return {
                          index,
                          stepBody: step.stepBody as ReactFragment,
                          stepHeader: props.widgetProps.fixedStepHeader as ReactFragment,
                          stepHeaderColor: props.widgetProps.fixedStepHeaderColor as string
                      };
                  })
                : props.widgetProps.slidingWizardStepList.map((step, index) => {
                      return {
                          index,
                          stepBody: step.stepBody as ReactFragment,
                          stepHeader: step.stepHeader as ReactFragment,
                          stepHeaderColor: step.headerColor as string
                      };
                  });
        setWizardSteps(() => wizardStepObjects);
    };

    return (
        <WizardContext.Provider
            value={{
                widgetProps: props.widgetProps,
                stepWidth,
                onSetStepWidth,
                wizardSteps: wizardSteps,
                onCreateWizardSteps,
                activeStep,
                setActiveStep,
                onActiveStepChange
            }}
        >
            {props.children}
        </WizardContext.Provider>
    );
};

export default WizardContextProvider;
