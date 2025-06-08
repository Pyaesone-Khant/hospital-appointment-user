import { Button, Modal } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import React from "react";

export function AuthModal({
    children,
    opened,
    closeAuthModal,
}: {
    children: React.ReactNode;
    opened: boolean;
    closeAuthModal: () => void;
}) {
    return (
        <>
            <Modal
                opened={opened}
                onClose={closeAuthModal}
                fullScreen
                withCloseButton={false}
                classNames={{
                    content: "bg-primary-gradient ",
                    body: "flex flex-1 h-full bg-primary-gradient",
                }}
                transitionProps={{
                    transition: "pop",
                    duration: 300,
                    timingFunction: "ease",
                }}
            >
                <div
                    className="flex-1 flex flex-col max-w-lg mx-auto gap-4"
                >
                    <Button
                        variant="subtle"
                        leftSection={
                            <ArrowLeft />
                        }
                        className="!w-fit"
                        size="md"
                        onClick={closeAuthModal}
                    >
                        Back to Home
                    </Button>
                    <div
                        className="bg-white p-8 rounded-lg shadow space-y-6 my-auto"
                    >
                        {children}
                    </div>
                </div>
            </Modal>
        </>
    )
}
