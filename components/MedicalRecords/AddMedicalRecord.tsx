import { useResponsive } from "@/hooks";
import { Button, MultiSelect, Text, Textarea, TextInput, Title } from "@mantine/core";
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

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
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
                <TextInput
                    label="Patient Name"
                    placeholder="Enter patient's name"
                    size="md"
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
                    data={["Consultation", "Lab Tests", "Medication"]}
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
                >
                    Add Medical Record
                </Button>
            </form>
        </section>
    )
}
