"use client";

import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { Button, Group } from "@mantine/core";
import Link from "next/link";

export function Header() {

    const { openLoginModal } = useLoginContext();
    const { openSignUpModal } = useSignUpContext();

    return (
        <header className="bg-white sticky top-0 z-50 shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href={"/"}
                >
                    <h1 className="text-2xl font-bold">MediCare</h1>
                </Link>
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
            </div>
        </header>
    )
}
