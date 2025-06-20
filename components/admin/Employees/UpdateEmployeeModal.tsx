import { RoleEnum } from "@/constants";
import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Edit } from "lucide-react";
import { EmployeeForm } from "./EmployeeForm";

export function UpdateEmployeeModal({
    employee,
    role
}: {
    employee: Doctor | Nurse | Staff;
    role: RoleEnum
}) {

    const [opened, { toggle }] = useDisclosure(false);

    const getEmployeeId = (role: RoleEnum) => {
        switch (role) {
            case RoleEnum.DOCTOR:
                return (employee as Doctor).doctorId;
            case RoleEnum.NURSE:
                return (employee as Nurse).nurseId;
            case RoleEnum.STAFF:
                return (employee as Staff).staffId;
            default:
                return (employee as Staff).staffId;
        }
    };



    return (
        <>
            <ActionIcon
                variant="default"
                size="lg"
                onClick={toggle}
                color="blue"
                c={"blue"}
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
                        name: employee.fullName,
                        email: employee.email,
                        address: employee.address,
                        role: role,
                        department: (employee as Doctor).department || "",
                        specialization: (employee as Doctor).specialization || "",
                        password: "",
                        confirmedPassword: ""
                    }}
                    isEditing={true}
                    employeeId={getEmployeeId((employee as unknown as User).role as RoleEnum)}
                    onCloseModal={toggle}
                />
            </Modal>
        </>
    )
}
