"use client";

import { LogoutModal } from '@/components/common';
import { MediCareLogo } from '@/components/common/icons';
import { JWTRoleEnum } from '@/constants';
import { useUserStore } from '@/states/zustand/user';
import { Group, NavLink, Stack } from '@mantine/core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks: {
    label: string;
    href: string;
    icon: IconName;
    roles: JWTRoleEnum[];
}[] = [
        {
            label: 'Dashboard',
            href: '/admin',
            icon: 'layout-dashboard',
            roles: [JWTRoleEnum.ADMIN, JWTRoleEnum.STAFF]
        },
        {
            label: 'Employees',
            href: '/admin/employees',
            icon: 'user-search',
            roles: [JWTRoleEnum.ADMIN]
        },
        // {
        //     label: 'Appointments',
        //     href: '/admin/appointments',
        //     icon: 'calendar',
        //     roles: [JWTRoleEnum.STAFF]
        // },
        {
            label: 'Patients',
            href: '/admin/patients',
            icon: 'users',
            roles: [JWTRoleEnum.ADMIN]
        },
        {
            label: 'Departments',
            href: '/admin/departments',
            icon: 'building',
            roles: [JWTRoleEnum.ADMIN]
        },
        {
            label: 'Payments',
            href: '/admin/payments',
            icon: 'credit-card',
            roles: [JWTRoleEnum.STAFF]
        },
        {
            label: "Fees",
            href: '/admin/fees',
            icon: 'dollar-sign',
            roles: [JWTRoleEnum.STAFF]
        },
        {
            label: 'Settings',
            href: '/admin/settings',
            icon: 'settings',
            roles: [JWTRoleEnum.ADMIN, JWTRoleEnum.STAFF]
        }
    ];

export function Sidebar() {
    const pathname = usePathname();

    const jwt = useUserStore(state => state.jwt);


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
                gap={4}
            >
                {
                    NavLinks.map((item) => {

                        if (!jwt || !jwt.role) return null;

                        if (!item.roles.includes(jwt?.role)) return null;

                        return (
                            <NavLink
                                key={JSON.stringify(item)}
                                label={item.label}
                                href={item.href}
                                component={Link}
                                leftSection={
                                    <DynamicIcon
                                        name={item.icon}
                                        size={18}
                                    />
                                }
                                classNames={{
                                    label: "!text-base"
                                }}
                                active={checkIsActive(item.href, pathname)}
                                variant={(checkIsActive(item.href, pathname) ? "filled" : "light")}
                            />
                        )
                    })
                }
            </Stack>
            <LogoutModal
                buttonProps={{
                    variant: "filled",
                    radius: 0,
                    classNames: {
                        inner: "!justify-start",
                    },
                }}
            />
        </nav >
    );
}

const checkIsActive = (link: string, pathname: string) => {
    return pathname === link;
}