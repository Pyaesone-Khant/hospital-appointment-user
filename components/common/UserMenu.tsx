"use client";

import { getJwtToken } from "@/services/getJwtToken";
import { useUserStore } from "@/states/zustand/user";
import { ActionIcon, Avatar, Button, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fingerprint, LogOutIcon, UserRound } from "lucide-react";
import { ChangePasswordForm } from "../Auth";
import { UserProfile } from "./UserProfile";

export function UserMenu() {

    const [opened, { toggle }] = useDisclosure(false);
    const [openedProfile, { toggle: toggleProfile }] = useDisclosure(false);
    const [logoutOpened, { toggle: toggleLogout }] = useDisclosure(false);

    const handleLogout = () => {
        useUserStore.getState().clearJwt();
        getJwtToken().removeJwtToken();
    }

    return (
        <>
            <Menu
                position="bottom-end"
                transitionProps={{
                    transition: "pop-top-right",
                    duration: 150
                }}
                arrowOffset={20}
                withArrow
                withinPortal
            >
                <MenuTarget>
                    <ActionIcon
                        size={40}
                        radius={"100%"}
                        variant="light"
                        color="blue"
                    >

                        <Avatar
                            color="black"
                            bg={"gray.1"}
                        />
                    </ActionIcon>
                </MenuTarget>
                <MenuDropdown
                    classNames={{
                        dropdown: "flex flex-col gap-2 bg-red-400",

                    }}
                >
                    <MenuItem
                        color="green"
                        onClick={toggleProfile}
                        leftSection={
                            <UserRound
                                size={18}
                            />
                        }
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        color="blue"
                        onClick={toggle}
                        leftSection={
                            <Fingerprint
                                size={18}
                            />
                        }
                    >
                        Change Password
                    </MenuItem>
                    <MenuItem
                        color="red"
                        onClick={toggleLogout}
                        leftSection={
                            <LogOutIcon
                                size={18}
                            />
                        }
                    >
                        Logout
                    </MenuItem>
                </MenuDropdown>
            </Menu>

            {/* user profile modal */}
            <Modal
                opened={openedProfile}
                onClose={toggleProfile}
                title="User Profile"
                centered
                zIndex={1000}
                size={600}
            >
                <UserProfile />
            </Modal>

            {/* change password modal */}
            <Modal
                opened={opened}
                onClose={toggle}
                title="Change Password"
                centered
                zIndex={1000}
            >
                <ChangePasswordForm
                    onModalClose={toggle}
                    showTitle={false}
                />
            </Modal>

            {/* logout modal */}
            <Modal
                opened={logoutOpened}
                onClose={toggleLogout}
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
                        onClick={toggleLogout}
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
