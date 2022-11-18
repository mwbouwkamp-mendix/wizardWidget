import React, { Fragment, useContext } from "react";
import { createElement, useEffect } from "react";
import { WizardContext } from "../store/wizard-context";

export interface WizardStepHeaderProps {
    index: number;
}

const WizardStepHeader = (props: WizardStepHeaderProps): JSX.Element => {
    const headerRef = React.createRef<HTMLDivElement>();

    const { widgetProps, wizardSteps, activeStep, onActiveStepChange } = useContext(WizardContext);

    useEffect((): void => {
        const headerElement = headerRef.current;
        if (!headerElement) {
            return;
        }
        const definedHeaderColor = wizardSteps[widgetProps.wizardType === "FIXED" ? 0 : props.index].stepHeaderColor;
        if (definedHeaderColor && definedHeaderColor.match("^#[0-9a-fA-F]{3,6}$")) {
            headerElement.style.backgroundColor = definedHeaderColor;
        } else {
            const wizardStepHeaderContents = headerElement.firstChild?.childNodes[0] as HTMLElement;
            if (wizardStepHeaderContents) {
                headerElement.style.backgroundColor = wizardStepHeaderContents.style.backgroundColor;
            }
        }
    }, []);

    const isActiveStep = props.index === activeStep;

    const headerWidth =
        widgetProps.wizardType === "FIXED"
            ? widgetProps.navigationWidthFixed
            : isActiveStep
            ? widgetProps.headerWidthSlidingActive
            : widgetProps.headerWidthSlidingInactive;

    const headerStyle =
        widgetProps.wizardType === "SLIDING"
            ? {
                  flex: isActiveStep ? "0 1 " + headerWidth + "px" : "0 0 " + headerWidth + "px",
                  width: headerWidth + "px"
              }
            : {};

    const rotateStyle =
        widgetProps.wizardType === "SLIDING" && !isActiveStep
            ? {
                  left: headerWidth / 2 + "px"
              }
            : {};

    let className = "wizardStepHeader";
    let classNameChild = "";
    if (widgetProps.wizardType === "SLIDING") {
        className = className + " isAnimating";
        classNameChild = "wizard-step-rotate" + (isActiveStep ? " opacityZero" : " opacityFull");
    }

    return (
        <div
            className={className}
            ref={headerRef}
            style={headerStyle}
            onClick={onActiveStepChange.bind(null, props.index)}
        >
            <div className={classNameChild} style={rotateStyle}>
                {wizardSteps
                    .filter(step =>
                        widgetProps.wizardType === "FIXED" ? step.index === 0 : step.index === props.index
                    )
                    .map(step => {
                        return <Fragment key={"header" + props.index}>{step.stepHeader}</Fragment>;
                    })}
            </div>
        </div>
    );
};

export default WizardStepHeader;
