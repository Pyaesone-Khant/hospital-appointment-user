interface Appointment {
    id: number,
    patientName: string,
    doctorName: string,
    dateTime: string,
    confirmed: boolean,
    cancelled: boolean

}

interface Specialty {
    id: number;
    name: string;
    description?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string
    role: "USER" | "DOCTOR" | "NURSE" | "STAFF" | "ADMIN";
    active?: boolean;
}

interface MedicalRecord {
    id: number;
    patientName: string;
    doctorName: string;
    diagnosis: string;
    createdDate: string;
}

enum RoleEnum {
    STAFF = "ROLE_STAFF",
    DOCTOR = "ROLE_DOCTOR",
    PATIENT = "ROLE_PATIENT",
    ADMIN = "ROLE_ADMIN",
    NURSE = "ROLE_NURSE",
}

interface JWT {
    accessToken: string;
    type: string;
    expiredAt: string;
    role: RoleEnum;
}

interface Doctor extends Pick<User, "email" | "address" | "phone" | "active"> {
    doctorId: number;
    fullName: string;
    specialization: string;
    department: string;
    assignedNurse: string;
}

interface Nurse extends Pick<Doctor, "fullName" | "email" | "address" | "phone" | "active"> {
    nurseId: number;
    assignedDoctor: string;
}

interface Staff extends Pick<User, "email" | "address" | "phone" | "active"> {
    staffId: number;
    fullName: string;
}

interface Payment {
    id: number;
    patientName: string;
    amount: number;
    method: string;
    paymentDate: string
}