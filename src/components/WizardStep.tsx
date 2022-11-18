import { createElement, createRef, useContext } from "react";
import { WizardContext } from "../store/wizard-context";
import WizardStepBody from "./WizardStepBody";
import WizardStepHeader from "./WizardStepHeader";

export interface WizardStepProps {
    index: number;
}

const WizardStep = (props: WizardStepProps): JSX.Element => {
    const slidingWizardStepRef = createRef<HTMLDivElement>();

    const { stepWidth, widgetProps, activeStep } = useContext(WizardContext);

    const calculateTranform = (index: number, width: number): number => {
        return index <= activeStep
            ? -index * (width - widgetProps.headerWidthSlidingInactive)
            : -(index - 1) * (width - widgetProps.headerWidthSlidingInactive);
    };

    const stepStyle =
        widgetProps.wizardType === "SLIDING"
            ? {
                  minWidth: stepWidth + "px",
                  transform: "translate(" + calculateTranform(props.index, stepWidth) + "px)"
              }
            : {
                  width: "100%"
              };

    return (
        <div
            className={`wizard-step isAnimating ${
                widgetProps.wizardType === "FIXED" ? "orientation-" + widgetProps.headerOrientation : ""
            }`}
            style={stepStyle}
            ref={slidingWizardStepRef}
        >
            <WizardStepHeader index={props.index} />
            <WizardStepBody index={props.index} />
        </div>
    );
};

export default WizardStep;
