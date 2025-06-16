// auth
interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    confirmedPassword: string;
}

interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

interface RequestResetPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmedPassword: string;
}

// admin
interface CreateStaffRequest extends SignupRequest {
    address: string;
    role: "STAFF" | "DOCTOR" | "NURSE";
}

interface AssignNurseRequest {
    nurseName: string;
}

interface AssignDoctorShiftRequest {
    doctorId: number;
    date: string;
    startTime: string;
    endTime: string;
}


// patient
interface BookAppointmentRequest {
    doctorId: number;
    dateTime: string
}

interface MakePaymentRequest {
    paymentId: number;
    paymentMethod: string;
    amount: number
}

// doctor
interface AddMedicalRecordRequest {
    patientName: number;
    date: string;
    diagnosis: string;
    feeIds: number[]
}

// staff
interface CreateFeeRequest {
    name: string;
    amount: number;
    description?: string;
}

interface CreateDepartmentRequest {
    name: string;
}