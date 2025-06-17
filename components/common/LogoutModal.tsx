"use client";

import { getJwtToken } from "@/services/getJwtToken";
import { useUserStore } from "@/states/zustand/user";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function LogoutModal() {

    const [opened, { toggle }] = useDisclosure(false);

    const handleLogout = () => {
        useUserStore.getState().clearJwt();
        getJwtToken().removeJwtToken();
        redirect("/login");
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
