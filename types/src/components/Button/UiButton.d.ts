import './index.scss';
import { ReactElement, ReactNode } from 'react';
export interface IButtonProps {
    children?: ReactElement | ReactNode;
    variant?: keyof typeof ButtonVariants;
    onClick?: () => void;
}
export declare enum ButtonVariants {
    red = "red",
    blue = "blue"
}
declare const UiButton: (props: IButtonProps) => JSX.Element;
export default UiButton;
