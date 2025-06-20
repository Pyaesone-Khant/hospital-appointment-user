"use client";

import { SlideUp } from "@/components/common";
import { RoleEnum } from "@/constants";
import { Divider, Group, Select } from "@mantine/core";
import { useState } from "react";
import { DoctorList, NurseList } from "../Doctors";
import { StaffList } from "../Staffs";
import { AddEmployeeModal } from "./AddEmployeeModal";

export function EmployeeList() {

    const [employeeType, setEmployeeType] = useState<RoleEnum>(RoleEnum.DOCTOR);

    const handleEmployeeTypeChange = (value: string) => {
        setEmployeeType(value as RoleEnum);
    };

    const getTitle = () => {
        switch (employeeType) {
            case RoleEnum.DOCTOR:
                return "Doctors List";
            case RoleEnum.NURSE:
                return "Nurses List";
            case RoleEnum.STAFF:
                return "Staffs List";
            default:
                return "Employees List";
        }
    }

    return (
        <section>
            <SlideUp
                className="flex items-center justify-between gap-4"
            >
                <h3 className="text-2xl font-semibold">{getTitle()}</h3>

                <Group>
                    <Select
                        value={employeeType}
                        onChange={(value) => handleEmployeeTypeChange(value!)}
                        data={[
                            { value: RoleEnum.DOCTOR, label: "Doctors" },
                            { value: RoleEnum.NURSE, label: "Nurses" },
                            { value: RoleEnum.STAFF, label: "Staffs" },
                        ]}
                        allowDeselect={false}
                        size="md"
                        width={100}
                    />
                    <AddEmployeeModal />
                </Group>
            </SlideUp>

            <Divider
                size={"xs"}
                my={20}
            />

            {
                employeeType === RoleEnum.DOCTOR && (
                    <DoctorList />
                )
            }

            {
                employeeType === RoleEnum.NURSE && (
                    <NurseList />
                )
            }

            {
                employeeType === RoleEnum.STAFF && (
                    <StaffList />
                )
            }
        </section>
    )
}
