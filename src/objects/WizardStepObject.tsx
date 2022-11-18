import { ReactFragment } from "react";

export default interface WizardStepObject {
    index: number;
    stepBody: ReactFragment;
    stepHeader: ReactFragment;
    stepHeaderColor: string;
}
