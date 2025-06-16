"use client";

import { useLoginContext } from "@/contexts/login.context";
import { Avatar, Badge, Button, Card, Stack, Text } from "@mantine/core";
import { Calendar } from "lucide-react";

export function DoctorCard({
    doctor
}: {
    doctor: Doctor;
}) {

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
                gap={4}
            >
                <Avatar
                    size="xl"
                    mb={12}
                />
                <Text
                    size="lg"
                    fw={600}
                >
                    {doctor.fullName}</Text>
                <Badge
                    variant="outline"
                    bg={"gray.3"}
                >
                    {doctor.specialization}
                </Badge>
            </Stack>
            <Stack>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Email: </span>
                    <span className="font-medium">{doctor.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phone: </span>
                    <span className="font-medium">{doctor.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{doctor.active ? "Available" : "Unavailable"}</span>
                </div>
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

