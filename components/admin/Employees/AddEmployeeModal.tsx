import { RoleEnum } from "@/constants";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { EmployeeForm } from "./EmployeeForm";

export function AddEmployeeModal({
    employeeType
}: {
    employeeType?: RoleEnum
}) {

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Button
                leftSection={
                    <Plus
                        size={18}
                    />
                }
                size="md"
                onClick={toggle}
            >
                New
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Create New Staff"
                centered
                size={"xl"}
                closeOnClickOutside={false}
                closeOnEscape={false}
            >

                <EmployeeForm
                    initialValues={{
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        password: "",
                        confirmedPassword: "",
                        role: employeeType ?? RoleEnum.STAFF,
                        specialization: "",
                        department: ""
                    }}
                    isEditing={false}
                    onCloseModal={toggle}
                />
            </Modal >
        </>
    )
}
