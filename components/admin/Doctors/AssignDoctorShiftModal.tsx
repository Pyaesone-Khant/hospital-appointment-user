"use client";
import { Button, Modal } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

export function AssignDoctorShiftModal(props: Doctor) {

    const [opened, { toggle }] = useDisclosure(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            date: dayjs().format('YYYY-MM-DD'),
            startTime: "",
            endTime: "",
        },
        validate: {
            date: (value) => (value ? null : 'Date is required'),
            startTime: (value) => (value ? null : 'Start time is required'),
            endTime: (value, { startTime }) => {
                const startTimeValue = parseInt(startTime.replace(':', ''), 10);
                const endTimeValue = parseInt(value.replace(':', ''), 10);
                if (!value) {
                    return 'End time is required';
                }
                if (startTime && endTimeValue <= startTimeValue) {
                    return 'End time must be after start time';
                }
            },
        },

        onValuesChange: ({ startTime, endTime }) => {

            const startTimeValue = parseInt(startTime.replace(':', ''), 10);
            const endTimeValue = parseInt(endTime.replace(':', ''), 10);

            if (startTime && endTime && startTimeValue > endTimeValue) {
                form.setFieldError('endTime', 'End time must be after start time');
                return;
            } else {
                form.setFieldError('endTime', null);
                return;
            }
        }
    });

    const handleSubmit = (values: typeof form.values) => {

        const { startTime, endTime } = values;

        const payload: AssignDoctorShiftRequest = {
            doctorId: props.doctorId,
            ...values,
            startTime: startTime.slice(0, 5),
            endTime: endTime.slice(0, 5),
        }
        console.log(payload)
    };

    return (
        <>
            <Button
                variant="outline"
                leftSection={
                    <Plus
                        size={18}
                    />
                }
                onClick={toggle}
                size="sm"
            >
                Shift
            </Button >
            <Modal
                opened={opened}
                onClose={toggle}
                title="Assign Doctor Shift"
                centered
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <DatePickerInput
                        variant="filled"
                        label="Date"
                        placeholder="Select date"
                        valueFormat="YYYY-MM-DD"
                        withAsterisk
                        size="md"
                        excludeDate={(date) => dayjs(date).isBefore(dayjs(), 'day')}
                        {...form.getInputProps('date')}
                    />

                    <TimePicker
                        variant="filled"
                        label="Start Time"
                        format="24h"
                        withDropdown
                        withAsterisk
                        size="md"
                        minutesStep={15}
                        {...form.getInputProps('startTime')}
                    />

                    <TimePicker
                        variant="filled"
                        label="End Time"
                        format="24h"
                        withDropdown
                        withAsterisk
                        size="md"
                        minutesStep={15}
                        disabled={!form.values.startTime}
                        {...form.getInputProps('endTime')}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        color="blue"
                        variant="filled"
                    >
                        Confirm
                    </Button>
                </form>
            </Modal>
        </>
    )
}
