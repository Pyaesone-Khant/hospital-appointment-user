import { Badge, BadgeProps } from "@mantine/core";
import React from "react";

type StatusBadgeProps = {
    children?: React.ReactNode;
} & BadgeProps

export function StatusBadge({
    children,
    ...props
}: StatusBadgeProps) {
    return (
        <Badge
            {...props}
            classNames={{
                root: "!border !border-current/50"
            }}
            variant="light"
            size="lg"
            tt={"capitalize"}
            fw={500}
        >
            {children}
        </Badge>
    )
}
