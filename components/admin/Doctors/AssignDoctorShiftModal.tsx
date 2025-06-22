"use client";
import { RoleEnum } from "@/constants";
import { useAssignDoctorShift, useGetEmployees } from "@/hooks/query-hooks/useAdmin";
import { Button, Modal, Select } from "@mantine/core";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

export function AssignDoctorShiftModal() {

    const [opened, { toggle }] = useDisclosure(false);

    const { data: doctors } = useGetEmployees(RoleEnum.DOCTOR);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            doctorId: "",
            date: dayjs().format('YYYY-MM-DD'),
            startTime: "",
            endTime: "",
        },
        validate: {
            doctorId: isNotEmpty('Doctor is required'),
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

    const { mutate, isLoading } = useAssignDoctorShift();

    const handleSubmit = (values: typeof form.values) => {

        const { startTime, endTime } = values;

        const payload: AssignDoctorShiftRequest = {
            ...values,
            startTime: startTime.slice(0, 5),
            endTime: endTime.slice(0, 5),
        }

        mutate(payload, {
            onSuccess: () => {
                toggle();
                form.reset();
            }
        })
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
                Assign Shift
            </Button >
            <Modal
                opened={opened}
                onClose={toggle}
                title="Assign Doctor Shift"
                centered
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-4"
                >

                    <Select
                        label="Doctor"
                        placeholder="Select a doctor"
                        data={doctors?.map((doctor) => ({
                            value: (doctor as Doctor).doctorId.toString(),
                            label: (doctor as Doctor).fullName,
                        })) || []}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('doctorId')}
                    />

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
                        mt={40}
                        type="submit"
                        fullWidth
                        variant="filled"
                        loading={isLoading}

                    >
                        Confirm
                    </Button>
                </form>
            </Modal>
        </>
    )
}
