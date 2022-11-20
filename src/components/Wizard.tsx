/* eslint-disable react-hooks/exhaustive-deps */
import { createElement, ReactElement, useContext, useEffect, useRef } from "react";
import { WizardContext } from "../store/wizard-context";
import WizardStep from "./WizardStep";

const Wizard = (): ReactElement => {
    const { widgetProps, onSetStepWidth, wizardSteps, onCreateWizardSteps, activeStep, setActiveStep } =
        useContext(WizardContext);

    const wizardRef = useRef<HTMLDivElement>(null);

    /**
     * Calls onSetStepWidth with the current clientWidth of the widget, using a timeout. The timeout is necessary to fix
     * some issues in the popup and other timing issues.
     *
     * TODO: Need a solution, so this is no longer required. This is a temporary fix.
     */
    const setWidthWithTimeout = (): void => {
        setTimeout((): void => {
            onSetStepWidth(wizardRef.current?.clientWidth);
        }, 300);
    };

    /**
     * Set the width value of the widget on initiation and on change of window size
     */
    useEffect((): void => {
        onSetStepWidth(wizardRef.current?.clientWidth);
        setWidthWithTimeout();
        window.addEventListener("resize", setWidthWithTimeout);
        return window.addEventListener("resize", () => setWidthWithTimeout);
    }, [widgetProps]);

    // Call onCreateWizardSteps to initialize the wizard
    useEffect((): void => {
        onCreateWizardSteps();
    }, []);

    /**
     * Call setActiveStep to set the value for the actie step of the wizard when activeStep prop changes
     */
    useEffect(() => {
        setActiveStep(parseInt(widgetProps.activeStep.displayValue, 10));
    }, [widgetProps.activeStep]);

    /**
     * Map the wizardSteps to the corresponding WizardStep components
     *
     * @returns WizardStep components
     */
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
