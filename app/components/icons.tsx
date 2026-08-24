import { ArrowUpRight, ArrowUp, ChevronDown } from "lucide-react";

export function ArrowUpRightIcon({ size = "1em", strokeWidth = 2.25, ...rest }: React.ComponentProps<typeof ArrowUpRight>) {
    return (
        <span className="arrow-icon" aria-hidden="true">
            <ArrowUpRight size={size} strokeWidth={strokeWidth} {...rest} />
        </span>
    );
}

export function DownArrowIcon({ size = 15, strokeWidth = 2.5, ...rest }: React.ComponentProps<typeof ChevronDown>) {
    return (
        <span className="arrow-icon" aria-hidden="true">
            <ChevronDown size={size} strokeWidth={strokeWidth} {...rest} />
        </span>
    );
}

export function ArrowUpIcon({ size = "1em", strokeWidth = 2.25, ...rest }: React.ComponentProps<typeof ArrowUp>) {
    return (
        <span className="arrow-icon" aria-hidden="true">
            <ArrowUp size={size} strokeWidth={strokeWidth} {...rest} />
        </span>
    );
}