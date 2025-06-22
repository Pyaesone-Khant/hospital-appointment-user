"use client";

import { Button, ButtonProps, Modal, ModalProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface ConfirmationModalProps {
    children: React.ReactElement;
    onConfirm: () => void;
    modalProps?: ModalProps;
    buttonProps?: ButtonProps
}

export function ConfirmationModal({
    children,
    onConfirm,
    buttonProps,
    modalProps
}: ConfirmationModalProps) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Button
                variant="subtle"
                color="red"
                onClick={open}
                size="sm"
                {...buttonProps}
            >
                {children}
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                title="Confirmation"
                centered
                {...modalProps}
            >
                <article>
                    <p>Are you sure you want to proceed with this action?</p>
                    <p>This action cannot be undone.</p>
                </article>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                    <button onClick={close} style={{ marginRight: 10 }}>Cancel</button>
                    <button onClick={() => { onConfirm(); close(); }}>Confirm</button>
                </div>
            </Modal>
        </>
    )
}
