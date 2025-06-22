import { JWTRoleEnum } from "@/constants";
import { useUserStore } from "@/states/zustand/user";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { Appointments, BookAppointment } from "../Appointments";
import { Shifts } from "../Doctors/Shifts";
import { AddMedicalRecord, MedicalRecords } from "../MedicalRecords";
import { UserPaymentHistory } from "../Payments/UserPaymentHistory";

export function DashboardTabContents() {

    const jwt = useUserStore((state) => state.jwt);

    const isPatient = jwt && jwt.role === JWTRoleEnum.USER;
    const isDoctor = jwt && jwt.role === JWTRoleEnum.DOCTOR;
    const isNurse = jwt && jwt.role === JWTRoleEnum.NURSE;

    const defaultTab = isNurse ? "medical_records" : "appointments";

    return (
        <Tabs variant="outline" defaultValue={defaultTab}>
            <TabsList
                mb={"lg"}
                classNames={{
                    list: "[&>.mantine-Tabs-tab[data-active=true]]:!bg-gray-100",
                }}
            >
                {
                    !isNurse && (
                        <TabsTab value="appointments">
                            Appointments
                        </TabsTab>
                    )
                }
                <TabsTab value="medical_records">
                    Medical Records
                </TabsTab>
                {
                    isPatient && (
                        <>
                            <TabsTab value="payment_history">
                                Payment History
                            </TabsTab>
                            <TabsTab value="book_appointment">
                                Book Appointment
                            </TabsTab>
                        </>
                    )
                }
                {
                    isDoctor && (
                        <TabsTab value="add_medical_record">
                            Add Medical Record
                        </TabsTab>
                    )
                }

                {
                    (isDoctor || isNurse) && (
                        <TabsTab value="shifts">
                            Shifts
                        </TabsTab>
                    )
                }
            </TabsList>

            {
                !isNurse && (
                    <TabsPanel value="appointments">
                        <Appointments />
                    </TabsPanel>
                )
            }

            <TabsPanel value="medical_records">
                <MedicalRecords />
            </TabsPanel>

            {
                isPatient && (
                    <>
                        <TabsPanel value="book_appointment">
                            <BookAppointment />
                        </TabsPanel>
                        <TabsPanel value="payment_history">
                            <UserPaymentHistory />
                        </TabsPanel>
                    </>
                )
            }

            {
                isDoctor && (
                    <TabsPanel value="add_medical_record" >
                        <AddMedicalRecord />
                    </TabsPanel>
                )
            }

            {
                (isDoctor || isNurse) && (
                    <TabsPanel value="shifts" >
                        <Shifts />
                    </TabsPanel>
                )
            }
        </Tabs>
    )
}
