import { useResponsive } from "@/hooks";
import { useAddMedicalRecord, useGetDoctorPatients } from "@/hooks/query-hooks/useDoctor";
import { useGetAllFees } from "@/hooks/query-hooks/useStaff";
import { Button, MultiSelect, Select, Text, Textarea, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

export function AddMedicalRecord() {

    const { isMobile } = useResponsive();
    const form = useForm({
        mode: "controlled",
        initialValues: {
            "patientName": "",
            "date": dayjs().format("YYYY-MM-DD"),
            "diagnosis": "",
            "feeIds": []
        },
        validate: {
            patientName: (value) => (value.length < 3 ? "Patient name must be at least 3 characters long" : null),
            date: (value) => (dayjs(value).isValid() ? null : "Invalid date"),
            diagnosis: (value) => (value.length < 5 ? "Diagnosis must be at least 5 characters long" : null),
            feeIds: (value) => (value.length === 0 ? "At least one fee must be selected" : null)
        }
    });

    const { data: patients } = useGetDoctorPatients();
    const { data: fees } = useGetAllFees();

    const { mutate, isLoading } = useAddMedicalRecord();

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
            },
        })
    };

    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Add Medical Record
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Fill out the form below to add a new medical record. Ensure all fields are completed accurately.
                </Text>
            </article>

            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <Select
                    label="Patient Name"
                    placeholder="Select patient"
                    data={patients?.map((patient) => ({
                        value: patient.name,
                        label: patient.name
                    })) || []}
                    variant="filled"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("patientName")}
                />

                <DatePickerInput
                    label="Date of Record"
                    placeholder="Select date"
                    variant="filled"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("date")}
                />
                <MultiSelect
                    label="Fees"
                    placeholder="Select applicable fees"
                    data={fees?.map((fee) => ({
                        value: fee.id.toString(),
                        label: `${fee.name} - $${fee.amount}`
                    })) ?? []}
                    variant="filled"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("feeIds")}
                />
                <Textarea
                    label="Diagnosis"
                    placeholder="Enter diagnosis details"
                    size="md"
                    withAsterisk
                    {...form.getInputProps("diagnosis")}
                />
                <Button
                    type="submit"
                    fullWidth
                    size="md"
                    color="blue"
                    loading={isLoading}
                >
                    Add Medical Record
                </Button>
            </form>
        </section>
    )
}
