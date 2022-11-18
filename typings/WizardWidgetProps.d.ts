/**
 * This file was generated from WizardWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type WizardTypeEnum = "FIXED" | "SLIDING";

export type HeaderOrientationEnum = "top" | "bottom" | "left" | "right";

export interface SlidingWizardStepListType {
    stepHeader?: ReactNode;
    stepBody: ReactNode;
    headerColor: string;
}

export interface FixedWizardStepListType {
    stepBody: ReactNode;
    headerColor: string;
}

export interface SlidingWizardStepListPreviewType {
    stepHeader: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    stepBody: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    headerColor: string;
}

export interface FixedWizardStepListPreviewType {
    stepBody: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    headerColor: string;
}

export interface WizardWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    wizardType: WizardTypeEnum;
    headerOrientation: HeaderOrientationEnum;
    slidingWizardStepList: SlidingWizardStepListType[];
    fixedStepHeader?: ReactNode;
    fixedStepHeaderColor: string;
    fixedWizardStepList: FixedWizardStepListType[];
    activeStep: EditableValue<Big>;
    clickedStep: EditableValue<Big>;
    navigationWidthFixed: number;
    headerWidthSlidingActive: number;
    headerWidthSlidingInactive: number;
    isHeaderClickable: boolean;
    onActiveStepChange?: ActionValue;
}

export interface WizardWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    wizardType: WizardTypeEnum;
    headerOrientation: HeaderOrientationEnum;
    slidingWizardStepList: SlidingWizardStepListPreviewType[];
    fixedStepHeader: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    fixedStepHeaderColor: string;
    fixedWizardStepList: FixedWizardStepListPreviewType[];
    activeStep: string;
    clickedStep: string;
    navigationWidthFixed: number | null;
    headerWidthSlidingActive: number | null;
    headerWidthSlidingInactive: number | null;
    isHeaderClickable: boolean;
    onActiveStepChange: {} | null;
}
