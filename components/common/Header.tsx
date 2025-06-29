"use client";

import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { useUserStore } from "@/states/zustand/user";
import { Button, Group, Text } from "@mantine/core";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

export function Header() {

    const { openLoginModal } = useLoginContext();
    const { openSignUpModal } = useSignUpContext();

    const jwt = useUserStore((state) => state.jwt);
    const user = useUserStore((state) => state.user);

    return (
        <header className="bg-white sticky top-0 z-50 shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
                <Link
                    href={"/"}
                >
                    <h1 className="text-2xl font-bold">MediCare</h1>
                </Link>
                {
                    jwt && jwt?.accessToken ? (
                        <Group>
                            <Text
                                c={".7"}
                            >
                                {user?.name || "User"}
                            </Text>
                            <UserMenu />
                        </Group>
                    ) : (
                        <Group>
                            <Button
                                variant="subtle"
                                onClick={openLoginModal}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={openSignUpModal}
                                className="bg-primary text-white hover:bg-primary-dark"
                            >
                                Sign Up
                            </Button>
                        </Group>
                    )
                }
            </div>
        </header>
    )
}
