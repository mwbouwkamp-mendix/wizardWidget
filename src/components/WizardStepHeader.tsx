import React, { createElement, Fragment, ReactElement, useContext, useEffect } from "react";
import { WizardContext } from "../store/wizard-context";

export interface WizardStepHeaderProps {
    index: number;
}

const WizardStepHeader = (props: WizardStepHeaderProps): ReactElement => {
    const headerRef = React.createRef<HTMLDivElement>();

    const { widgetProps, wizardSteps, activeStep, onActiveStepChange } = useContext(WizardContext);

    /**
     * Set color of the widget header
     */
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
    }, [headerRef, props.index, widgetProps.wizardType, wizardSteps]);

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
            : widgetProps.headerOrientation === "top" || widgetProps.headerOrientation === "bottom"
            ? {
                  width: "100%"
              }
            : {
                  width: headerWidth + "px"
              };

    const rotateStyle =
        widgetProps.wizardType === "SLIDING" && !isActiveStep
            ? {
                  left: headerWidth / 2 + "px"
              }
            : {};

    const className = widgetProps.wizardType === "SLIDING" ? "wizardStepHeader isAnimating" : "wizardStepHeader";

    const classNameChild =
        widgetProps.wizardType === "SLIDING"
            ? "wizard-step-rotate" + (isActiveStep ? " opacityZero" : " opacityFull")
            : "";

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
