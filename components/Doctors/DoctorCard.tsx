"use client";

import { useLoginContext } from "@/contexts/login.context";
import { Avatar, Badge, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { Building, Calendar, Mail, Phone } from "lucide-react";
import { StatusBadge } from "../common";

export function DoctorCard({
    doctor
}: {
    doctor: Doctor;
}) {


    const { department, fullName, specialization, email, phone, active } = doctor;

    const { openLoginModal } = useLoginContext();

    return (
        <Card
            className="hover:!shadow-lg transition-shadow space-y-4"
            radius={8}
            withBorder
        >
            <Stack
                justify="center"
                align="center"
                gap={8}
            >
                <Avatar
                    size="xl"
                    mb={12}
                />
                <Text
                    size="lg"
                    fw={600}
                >
                    {fullName}
                </Text>
                <Badge
                    variant="outline"
                    bg={"gray.3"}
                >
                    {specialization}
                </Badge>
            </Stack>
            <Stack>
                <Flex
                    justify={"space-between"}
                >
                    <Group
                        gap={12}
                    >
                        <Building className="w-4 h-4" />
                        <Text
                            fw={500}
                            fz={"sm"}
                        >
                            Department
                        </Text>
                    </Group>
                    <Text
                        fz={"sm"}
                    >
                        {department}
                    </Text>
                </Flex>
                <Flex
                    justify={"space-between"}
                >
                    <Group
                        gap={12}
                    >
                        <Mail className="w-4 h-4" />
                        <Text
                            fw={500}
                            fz={"sm"}
                        >
                            Email
                        </Text>
                    </Group>
                    <Text
                        fz={"sm"}
                    >
                        {email}
                    </Text>
                </Flex>
                <Flex
                    justify={"space-between"}
                >
                    <Group
                        gap={12}
                    >
                        <Phone className="w-4 h-4" />
                        <Text
                            fw={500}
                            fz={"sm"}
                        >
                            Phone
                        </Text>
                    </Group>
                    <Text
                        fz={"sm"}
                    >
                        {phone || "Not Provided"}
                    </Text>
                </Flex>
                <Flex
                    justify={"space-between"}
                >
                    <Group
                        gap={12}
                    >
                        <Calendar className="w-4 h-4" />
                        <Text
                            fw={500}
                            fz={"sm"}
                        >
                            Available Status
                        </Text>
                    </Group>

                    <StatusBadge
                        color={active ? "green" : "red"}
                    >
                        {active ? "Available" : "Unavailable"}
                    </StatusBadge>
                </Flex>
                <Button
                    onClick={openLoginModal}
                    fullWidth
                    mt={20}
                >
                    Book Appointment
                </Button>
            </Stack>
        </Card>
    )
}

