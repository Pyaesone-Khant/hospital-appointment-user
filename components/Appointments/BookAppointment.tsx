"use client";

import { useResponsive } from "@/hooks";
import { Button, Select, Text, Textarea, Title } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

const doctors: Doctor[] = [
    {
        "doctorId": 1,
        "fullName": "Thiri",
        "email": "Singapore",
        "address": "thiriyaminsu145@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": false
    },
    {
        "doctorId": 2,
        "fullName": "Win Aye",
        "email": "Singapore",
        "address": "wwaye005@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": true
    }
]

export function BookAppointment() {

    const { isMobile } = useResponsive();
    const form = useForm({
        // mode: "uncontrolled",
        initialValues: {
            dateTime: "",
            doctorId: '',
            reason: '',
        },
        validate: {
            dateTime: (value) => (!value ? 'Date is required!' : null),
            doctorId: (value) => (!value ? 'Doctor is required!' : null),
            reason: (value) => (!value ? 'Reason for appointment is required!' : null),
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        const dateTime = dayjs(values.dateTime).toISOString();
        const appointmentData = {
            ...values,
            dateTime,
        };
        console.log(appointmentData)
    }


    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Upcoming Appointments
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Your upcoming appointments are listed below. You can view details, reschedule, or cancel them as needed.
                </Text>
            </article>

            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <Select
                    label="Select Doctor"
                    placeholder="Choose a doctor"
                    data={doctors.map((doctor) => ({
                        value: doctor.doctorId.toString(),
                        label: doctor.fullName,
                    }))}
                    size="md"
                    {...form.getInputProps('doctorId')}
                />

                <DateTimePicker
                    label="Pick date"
                    placeholder="Pick date"
                    valueFormat="DD MMM, YYYY (hh:mm A)"
                    timePickerProps={{
                        withDropdown: true,
                        popoverProps: { withinPortal: false },
                        format: '12h',
                    }}
                    size="md"
                    excludeDate={(date) => dayjs(date).isBefore(dayjs().startOf('day'))}
                    {...form.getInputProps('dateTime')}
                />

                <Textarea
                    label="Reason for Appointment"
                    placeholder="Enter reason for appointment"
                    autosize
                    minRows={2}
                    maxRows={4}
                    size="md"
                    {...form.getInputProps('reason')}
                />

                <Button
                    type="submit"
                    fullWidth
                    size="md"
                    color="blue"
                    mt="md"
                >
                    Book Appointment
                </Button>
            </form>
        </section>
    )
}
