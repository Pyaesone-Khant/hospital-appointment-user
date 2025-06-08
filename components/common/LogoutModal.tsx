"use client";

import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut } from "lucide-react";

export function LogoutModal() {

    const [opened, { toggle }] = useDisclosure(false);

    const handleLogout = () => {
        // Logic to handle logout
        console.log("User logged out");
        toggle(); // Close the modal after logout
    }

    return (
        <>
            <Button
                variant="outline"
                color="red"
                onClick={toggle}
                leftSection={
                    <LogOut
                        size={18}
                    />
                }
                size="md"
            >
                Logout
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Confirm Logout"
                centered
            >
                <Text
                    c={"gray.7"}
                >
                    Are you sure you want to log out?
                </Text>
                <Group
                    justify="flex-end"
                    mt="lg"
                >
                    <Button
                        variant="transparent"
                        color="gray"
                        onClick={toggle}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleLogout}
                    >
                        Yes, Logout
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
