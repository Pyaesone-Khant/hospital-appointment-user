import { cn } from "@/services/cn"
import React from "react"

type AnimatedComponentProps = {
    children: React.ReactNode,
    animation?: "fade-in" | "slide-up", // Optional prop for animation class
} & React.HTMLAttributes<HTMLDivElement>

export function AnimatedComponent({
    children,
    animation = "slide-up", // Default animation class
    ...props
}: AnimatedComponentProps) {
    return (
        <div
            {...props}
            className={cn(props.className, {
                "animate-fade-in": animation === "fade-in",
                "animate-slide-up": animation === "slide-up",
            })}
        >
            {children}
        </div>
    )
}

export const SlideUp = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <AnimatedComponent
            animation="slide-up"
            className={cn("overflow-hidden", className)}
        >
            {children}
        </AnimatedComponent>
    )
}


export const FadeIn = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <AnimatedComponent
            animation="fade-in"
            className={cn("overflow-hidden", className)}
        >
            {children}
        </AnimatedComponent>
    )
}