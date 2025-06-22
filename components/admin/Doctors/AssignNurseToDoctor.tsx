import { RoleEnum } from "@/constants";
import { useAssignNurseToDoctor, useGetEmployees } from "@/hooks/query-hooks/useAdmin";
import { Button, Modal, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export function AssignNurseToDoctor() {

    const [opened, { toggle }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            doctorId: "",
            nurseName: "",
        },

        validate: {
            doctorId: isNotEmpty("Doctor ID is required"),
            nurseName: isNotEmpty("Nurse name is required"),
        },
    });

    const { data: nurses } = useGetEmployees(RoleEnum.NURSE);
    const { data: doctors } = useGetEmployees(RoleEnum.DOCTOR);
    const { mutate, isLoading } = useAssignNurseToDoctor();

    const handleSubmit = (values: typeof form.values) => {

        const payload = {
            doctorId: parseInt(values.doctorId, 10),
            data: values
        }

        mutate(payload, {
            onSuccess: () => {
                toggle();
            }
        })
    }

    return (
        <>
            <Button
                size="sm"
                onClick={toggle}
            >
                Assign Nurse to Doctor
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Assign Nurse to Doctor"
                centered
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <Select
                        label="Doctor"
                        placeholder="Select a doctor"
                        data={doctors?.filter(doctor => doctor.active).map((doctor) => ({
                            value: (doctor as Doctor).doctorId.toString(),
                            label: doctor.fullName
                        }))}
                        {...form.getInputProps("doctorId")}
                        searchable
                        nothingFoundMessage="No doctors found"
                        withAsterisk
                    />

                    <Select
                        label="Nurse Name"
                        placeholder="Select a nurse"
                        data={nurses?.filter((nurse) => nurse.active).map((nurse) => nurse.fullName)}
                        {...form.getInputProps("nurseName")}
                        searchable
                        nothingFoundMessage="No nurses found"
                        withAsterisk
                    />

                    <Button
                        type="submit"
                        size="md"
                        loading={isLoading}
                        fullWidth
                    >
                        Assign Nurse
                    </Button>
                </form>
            </Modal>
        </>
    )
}
