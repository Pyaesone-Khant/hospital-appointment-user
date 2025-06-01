"use client";

import { useLoginContext } from "@/contexts/login.context";
import { Avatar, Badge, Button, Card, Stack, Text } from "@mantine/core";
import { Calendar, Star } from "lucide-react";

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
                    {doctor.name}</Text>
                <Badge
                    variant="outline"
                    bg={"gray.3"}
                >
                    {doctor.specialty.name}
                </Badge>
            </Stack>
            <Stack>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{doctor.rating}</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{doctor.availability}</span>
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

