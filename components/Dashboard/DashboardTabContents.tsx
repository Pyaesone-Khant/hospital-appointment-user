import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { Appointments, BookAppointment } from "../Appointments";
import { AddMedicalRecord, MedicalRecordList } from "../MedicalRecords";

export function DashboardTabContents() {
    return (
        <Tabs variant="outline" defaultValue="appointments">
            <TabsList
                mb={"lg"}
                classNames={{
                    list: "[&>.mantine-Tabs-tab[data-active=true]]:!bg-gray-100",
                }}
            >
                <TabsTab value="appointments">
                    Appointments
                </TabsTab>
                <TabsTab value="medical_records">
                    Medical Records
                </TabsTab>
                <TabsTab value="book_appointment">
                    Book Appointment
                </TabsTab>
                <TabsTab value="add_medical_record">
                    Add Medical Record
                </TabsTab>
            </TabsList>

            <TabsPanel value="appointments">
                <Appointments />
            </TabsPanel>

            <TabsPanel value="medical_records">
                <MedicalRecordList />
            </TabsPanel>

            <TabsPanel value="book_appointment">
                <BookAppointment />
            </TabsPanel>

            <TabsPanel value="add_medical_record" >
                <AddMedicalRecord />
            </TabsPanel>
        </Tabs>
    )
}
