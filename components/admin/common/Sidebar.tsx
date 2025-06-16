"use client";

import { MediCareLogo } from '@/components/common/icons';
import { Button, Group, Stack } from '@mantine/core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const data = [
    { link: '/admin', label: 'Dashbaord', icon: "layout-dashboard" },
    { link: '/admin/appointments', label: 'Appointments', icon: "calendar" },
    { link: '/admin/patients', label: 'Patients', icon: "users" },
    { link: '/admin/doctors', label: 'Doctors', icon: "stethoscope" },
    { link: '/admin/nurses', label: 'Nurses', icon: "briefcase-medical" },
    { link: '/admin/payments', label: 'Payments', icon: "credit-card" },
    { link: '/admin/settings', label: 'Settings', icon: "settings" },
] satisfies {
    link: string;
    label: string;
    icon: IconName
}[];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-4 min-w-60 max-w-min w-full h-screen sticky top-0 bg-[var(--mantine-color-blue-0)] border-r border-blue-200">
            <Link
                href={"/admin"}
            >
                <Group
                    align='center'
                    justify='center'
                    py={8}
                    className={"group border-b border-blue-200"}
                >
                    <MediCareLogo
                        width={60}
                        height={60}
                        className="mix-blend-darken group-hover:opacity-80 duration-150"
                    />
                    <h1 className="text-2xl font-bold group-hover:opacity-80 duration-150">MediCare</h1>
                </Group>
            </Link>
            <Stack
                className='flex-1 overflow-y-auto'
                gap={8}
            >
                {
                    data.map((item) => (
                        <Button
                            component={Link}
                            variant={checkIsActive(item.link, pathname) ? "filled" : "subtle"}
                            key={JSON.stringify(item)}
                            href={item.link}
                            data-active={checkIsActive(item.link, pathname) || undefined}
                            leftSection={
                                <DynamicIcon
                                    name={item.icon}
                                    size={20}
                                    data-active={checkIsActive(item.link, pathname) || undefined}
                                />
                            }
                            classNames={{
                                root: "min-h-11",
                                inner: "!justify-start",
                            }}
                            radius={0}
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
                radius={0}
                classNames={{
                    inner: "!justify-start",
                }}
            >
                Logout
            </Button>
        </nav >
    );
}

const checkIsActive = (link: string, pathname: string) => {
    return pathname === link;
}