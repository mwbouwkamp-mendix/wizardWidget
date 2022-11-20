/* eslint-disable react-hooks/exhaustive-deps */
import { createElement, ReactElement, useContext, useEffect, useRef } from "react";
import { WizardContext } from "../store/wizard-context";
import WizardStep from "./WizardStep";

const Wizard = (): ReactElement => {
    const { widgetProps, onSetStepWidth, wizardSteps, onCreateWizardSteps, activeStep, setActiveStep } =
        useContext(WizardContext);

    const wizardRef = useRef<HTMLDivElement>(null);

    const setWidthWithTimeout = (): void => {
        setTimeout((): void => {
            onSetStepWidth(wizardRef.current?.clientWidth);
        }, 300);
    };

    useEffect((): void => {
        onSetStepWidth(wizardRef.current?.clientWidth);
        setWidthWithTimeout();
        window.addEventListener("resize", setWidthWithTimeout); // TODO: Currently this is a fix required for this to work in a popup. Need to find a better solution
        return window.addEventListener("resize", () => setWidthWithTimeout);
    }, [widgetProps]);

    useEffect((): void => {
        onCreateWizardSteps();
    }, []);

    useEffect(() => {
        setActiveStep(parseInt(widgetProps.activeStep.displayValue, 10));
    }, [widgetProps.activeStep]);

    const mapWizardSteps = (): ReactElement[] => {
        return wizardSteps
            .filter(step => widgetProps.wizardType === "SLIDING" || step.index === activeStep)
            .map(step => {
                return <WizardStep key={"wizardStep" + step.index} index={step.index} />;
            });
    };

    return (
        <div ref={wizardRef} className="slide-wizard">
            {mapWizardSteps()}
        </div>
    );
};

export default Wizard;
