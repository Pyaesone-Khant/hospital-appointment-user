import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Edit } from "lucide-react";
import { EmployeeForm } from "./EmployeeForm";

export function UpdateEmployeeModal({
    employee,
}: {
    employee: User;
}) {

    const [opened, { toggle }] = useDisclosure(false);
    return (
        <>
            <ActionIcon
                variant="light"
                size="lg"
                onClick={toggle}
                color="blue"
                disabled={!employee.active}
            >
                <Edit
                    size={18}
                />
            </ActionIcon>
            <Modal
                opened={opened} // This should be controlled by state
                onClose={toggle}
                title={`Update Details`}
                size="lg"
            >
                <EmployeeForm
                    initialValues={{
                        phone: employee.phone,
                        name: employee.name,
                        email: employee.email,
                        address: employee.address,
                        role: employee.role,
                        department: employee?.department || "",
                        specialization: employee?.specialization || "",
                    }}
                    isEditing={true}
                    employeeId={employee.id}
                    onCloseModal={toggle}
                />
            </Modal>
        </>
    )
}
