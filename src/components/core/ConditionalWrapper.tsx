import { ReactNode } from "react";

export interface ConditionalWrapperProps
{
    condition: any,
    wrapper: any,
    children: ReactNode
}

const ConditionalWrapper : React.FC<ConditionalWrapperProps> = (props: ConditionalWrapperProps) =>
{
    const wrapper = props.wrapper;

    return props.condition ? wrapper(props.children) : props.children;
}

export default ConditionalWrapper;