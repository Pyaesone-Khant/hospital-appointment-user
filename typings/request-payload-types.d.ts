// auth
interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password?: string;
    phone: string;
    confirmedPassword?: string;
    address: string;
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
    // address: string;
    role: "STAFF" | "DOCTOR" | "NURSE";
    department?: string;
    specialization?: string;
}

interface AssignNurseRequest {
    nurseName: string;
}

interface AssignDoctorShiftRequest {
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
}


// patient
interface BookAppointmentRequest {
    doctorId: string;
    dateTime: string
    reason?: string
}

interface MakePaymentRequest {
    paymentId: number;
    paymentMethod: PaymentMethod;
    totalAmount: number
}

// doctor
interface AddMedicalRecordRequest {
    patientName: string;
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

interface UpdateAppointmentStatusRequest {
    confirmed: boolean;
}