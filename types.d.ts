interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    dateTime: string;
    confirmed: boolean;
    cancelled: boolean;
}

interface Specialty {
    id: number;
    name: string;
    description?: string;
}

enum RoleEnum {
    DOCTOR = "DOCTOR",
    NURSE = "NURSE",
    STAFF = "STAFF",
}

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: RoleEnum;
    specialization?: string;
    department?: string;
    active?: boolean;
}

interface MedicalRecord {
    id: number;
    patientName: string;
    doctorName: string;
    diagnosis: string;
    createdDate: string;
}

enum JWTRoleEnum {
    STAFF = "ROLE_STAFF",
    DOCTOR = "ROLE_DOCTOR",
    PATIENT = "ROLE_PATIENT",
    ADMIN = "ROLE_ADMIN",
    NURSE = "ROLE_NURSE",
    USER = "ROLE_USER",
}

interface JWT {
    accessToken: string;
    type: string;
    expiredAt: string;
    role: JWTRoleEnum;
}

interface Doctor extends Pick<User, "email" | "address" | "phone" | "active"> {
    doctorId: number;
    fullName: string;
    specialization: string;
    department: string;
    assignedNurse: string;
}

interface Nurse
    extends Pick<
        Doctor,
        "fullName" | "email" | "address" | "phone" | "active"
    > {
    nurseId: number;
    nurseId: number;
    assignedDoctor: string;
}

interface Staff extends Pick<User, "email" | "address" | "phone" | "active"> {
    staffId: number;
    fullName: string;
}

enum PaymentMethod {
    CreditCard = "Credit Card",
    Cash = "Cash",
    BankTransfer = "Bank Transfer",
    MobilePayment = "Mobile Payment"
}

interface Payment {
    id: number;
    patientName: string;
    amount?: number;
    method: PaymentMethod;
    paymentDate: string;
}

interface Department {
    id: number;
    name: string;
}

interface DoctorShift {
    available: boolean;
    date: string;
    departmentName: string;
    doctorName: string;
    endTime: string;
    specialization: string;
    startTime: string;
}

interface NurseShift {
    "id": number,
    "nurseName": string,
    "date": string,
    "startTime": string,
    "endTime": string,
    "departmentName": string,
    "assignedDoctorName": string

}

interface Fee {
    id: number;
    name: string;
    amount: number;
    description: string;
}