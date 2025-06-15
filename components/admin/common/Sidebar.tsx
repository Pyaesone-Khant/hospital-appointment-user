"use client";

import { Button, Stack } from '@mantine/core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import Link from 'next/link';
import { useState } from 'react';

const data = [
    { link: '/admin', label: 'Dashbaord', icon: "layout-dashboard" },
    { link: '/admin/doctors', label: 'Doctors', icon: "stethoscope" },
    { link: '/admin/nurses', label: 'Nurses', icon: "briefcase-medical" },
    { link: '/admin/payments', label: 'Payments', icon: "credit-card" },
] satisfies {
    link: string;
    label: string;
    icon: IconName
}[];

export function Sidebar() {
    const [active, setActive] = useState('Dashbaord');

    return (
        <nav className="flex flex-col gap-4 max-w-60 w-full h-screen sticky top-0">
            <Link
                href={"/"}
            >
                <h1 className="text-2xl font-bold">MediCare</h1>
            </Link>
            <Stack
                className='flex-1 overflow-y-auto gap-2'
            >
                {
                    data.map((item) => (
                        <Button
                            component={Link}
                            key={JSON.stringify(item)}
                            href={item.link}
                            data-active={item.label === active || undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                setActive(item.label);
                            }}
                            leftSection={
                                <DynamicIcon
                                    name={item.icon}
                                    className='h-4 w-4'
                                    size={16}
                                    data-active={item.label === active || undefined}
                                />
                            }
                        >
                            {item.label}
                        </Button>
                    ))
                }
            </Stack>
            <Button
                variant="filled"
                color='red'
                leftSection={
                    <DynamicIcon
                        name="log-out"
                        className='h-4 w-4'
                        size={16}
                    />
                }
            >
                Logout
            </Button>
        </nav>
    );
}