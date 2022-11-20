import { createElement, Fragment, ReactElement, useContext } from "react";
import { WizardContext } from "../store/wizard-context";

export interface WizardStepBodyProps {
    index: number;
}
const WizardStepBody = (props: WizardStepBodyProps): ReactElement => {
    const { wizardSteps, activeStep } = useContext(WizardContext);

    return (
        <div className={`wizard-step-body ${props.index === activeStep ? "visible" : "invisible"} isAnimating`}>
            <div>
                {wizardSteps
                    .filter(step => step.index === props.index)
                    .map(step => {
                        return <Fragment key={"body" + step.index}>{step.stepBody}</Fragment>;
                    })}
            </div>
        </div>
    );
};

export default WizardStepBody;
