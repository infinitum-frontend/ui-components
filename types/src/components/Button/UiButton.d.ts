import './index.scss';
import { ReactElement, ReactNode } from 'react';
export interface IButtonProps {
    children?: ReactNode;
    variant?: keyof typeof ButtonVariants;
    onClick?: () => void;
}
export declare enum ButtonVariants {
    red = "red",
    blue = "blue"
}
declare const UiButton: (props: IButtonProps) => ReactElement;
export default UiButton;
