import { createElement, ReactElement } from "react";
import { WizardWidgetContainerProps } from "../typings/WizardWidgetProps";

import "./ui/WizardWidget.css";
import Wizard from "./components/Wizard";
import WizardContextProvider from "./store/wizard-context";

const SlidingWizard = (props: WizardWidgetContainerProps): ReactElement => {
    return (
        <WizardContextProvider widgetProps={props}>
            <Wizard />
        </WizardContextProvider>
    );
};

export default SlidingWizard;
