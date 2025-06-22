import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const createApi = (apiInstance: AxiosInstance) => {
    return _thenData({
        // auth
        signup: (data: SignupRequest): Promise<User> => apiInstance.post('/auth/signup', data),

        login: (data: LoginRequest): Promise<JWT> => apiInstance.post('/auth/login', data),

        changePassword: (data: ChangePasswordRequest): Promise<object> => apiInstance.put('/auth/change-password', data),

        requestPasswordReset: (data: RequestResetPasswordRequest) => apiInstance.post('/auth/request-reset-password', data),

        resetPassword: (data: ResetPasswordRequest) => apiInstance.put('/auth/reset-password', data),

        // admin
        createStaff: (data: CreateStaffRequest): Promise<{ success: boolean, message: string }> => apiInstance.post('/admin/createStaff', data),

        updateStaff: (employee: number, data: CreateStaffRequest): Promise<{ success: boolean, message: string }> => apiInstance.put(`/admin/updateStaff/${employee}`, data),

        deleteStaff: (staffId: number) => apiInstance.delete(`/admin/removeStaff/${staffId}`),

        getAllDoctors: (): Promise<Doctor[]> => apiInstance.get('/admin/doctors'),

        getAllStaffs: (): Promise<Staff[]> => apiInstance.get('/admin/staffs'),

        getAllNurses: (): Promise<Nurse[]> => apiInstance.get('/admin/nurses'),

        getAllPatients: (): Promise<User[]> => apiInstance.get('/admin/patients'),

        assignNurse: (doctorId: number, data: AssignNurseRequest) => apiInstance.put(`/admin/assignedNurse/${doctorId}`, data),

        assignDoctorShift: (data: AssignDoctorShiftRequest) => apiInstance.post('/admin/addSchedule', data),

        getAllDoctorShifts: (): Promise<DoctorShift[]> => apiInstance.get(`/admin/allDoctorSchedules`),

        getAllDepartments: (): Promise<Department[]> => apiInstance.get('/admin/allDepartments'),

        addDepartment: (data: CreateDepartmentRequest) => apiInstance.post('/admin/addDepartment', data),

        getAllUsers: (): Promise<User[]> => apiInstance.get('/admin/getAllUsers'),

        // patient
        bookAppointment: (data: BookAppointmentRequest): Promise<{ success: boolean, message: string }> => apiInstance.post('/users/bookAppointment', data),

        makePayment: (data: MakePaymentRequest) => apiInstance.post('/users/confirm', data),

        getDoctorsWithSpecialization: (specialization: string): Promise<Doctor[]> => apiInstance.get(`/users/getDoctorWithSpecialization`, {
            params: { specialization }
        }),

        getUserPaymentHistory: (): Promise<Payment[]> => apiInstance.get('/users/my-payments'),

        getUserMedicalRecordHistory: (): Promise<MedicalRecord[]> => apiInstance.get('/users/viewMedicalRecord'),

        getUserAppointments: (): Promise<Appointment[]> => apiInstance.get('/users/viewAppointment'),

        cancelAppointment: (appointmentId: number): Promise<{ success: boolean, message: string }> => apiInstance.put(`/users/appointments/cancel/${appointmentId}`),

        getAvailableDoctors: (): Promise<DoctorShift[]> => apiInstance.get('/users/getAllDoctorSchedules'),

        // doctor
        getDoctorInfo: () => apiInstance.get('/doctors/getDoctorInfo'),

        getAssignedShifts: (): Promise<DoctorShift[]> => apiInstance.get('/doctors/getDoctorSchedule'),

        getDoctorAppointments: (): Promise<Appointment[]> => apiInstance.get('/doctors/viewAppointment'),

        addMedicalRecord: (data: AddMedicalRecordRequest) => apiInstance.post('/doctors/addMedicalRecord', data),

        getMedicalRecords: (): Promise<MedicalRecord[]> => apiInstance.get(`/doctors/viewMedicalRecord`),

        getDoctorPatients: (): Promise<User[]> => apiInstance.get('/doctors/patients'),

        // nurse
        getNurseShifts: (): Promise<NurseShift[]> => apiInstance.get('/nurses/getNurseSchedules'),

        getNurseMedicalRecords: (): Promise<MedicalRecord[]> => apiInstance.get('/nurses/viewMedicalRecord'),

        // staff
        getAllAppointments: (): Promise<Appointment[]> => apiInstance.get('/staffs/viewAllAppointments'),

        updateAppointmentStatus: (appointmentId: number, data: UpdateAppointmentStatusRequest) => apiInstance.put(`/staffs/confirmedAppointment/${appointmentId}`, data),

        getAllMedicalRecords: (): Promise<MedicalRecord[]> => apiInstance.get('/staffs/viewMedicalRecord'),

        createFee: (data: CreateFeeRequest) => apiInstance.post("/staffs/fees", data),

        updateFee: (feeId: number, data: CreateFeeRequest) => apiInstance.put(`/staffs/fees/${feeId}`, data),

        getAllFees: (): Promise<Fee[]> => apiInstance.get(`/staffs/fees`),

        deleteFee: (feeId: number) => apiInstance.delete(`/staffs/fees/${feeId}`),

        getAllPayments: (): Promise<Payment[]> => apiInstance.get('/staffs/payments'),
    })
}

type ErrorResponse = { error?: string };

function _thenData<T>(OriginApi: T): T {
    const _API: Partial<T> = {};
    for (const key in OriginApi) {
        if (Object.prototype.hasOwnProperty.call(OriginApi, key)) {
            _API[key] = ((...args: any[]) =>
                (OriginApi[key] as any)(...args)
                    .then((res: AxiosResponse<T, T>) => res.data)
                    .catch((error: AxiosError<ErrorResponse>) => {
                        throw error.response?.data?.message
                        || error.response?.data?.error
                        || error.message
                        || 'An unknown error occurred';
                    })
            ) as T[typeof key];
        }
    }
    return _API as T;
}

export function setApiToken({
    apiInstance,
    token,
}: {
    apiInstance: AxiosInstance;
    token: string;
}) {
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete apiInstance.defaults.headers.common['Authorization'];
    }
}