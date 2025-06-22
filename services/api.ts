import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const createApi = (apiInstance: AxiosInstance) => {
    return _thenData({
        // auth
        signup: (data: SignupRequest) => apiInstance.post('/auth/signup', data),

        login: (data: LoginRequest): Promise<JWT> => apiInstance.post('/auth/login', data),

        changePassword: (data: ChangePasswordRequest) => apiInstance.post('/auth/change-password', data),

        requestPasswordReset: (data: RequestResetPasswordRequest) => apiInstance.post('/auth/request-reset-password', data),

        resetPassword: (data: ResetPasswordRequest) => apiInstance.post('/auth/reset-password', data),

        // admin
        createStaff: (data: CreateStaffRequest) => apiInstance.post('/admin/createStaff', data),

        updateStaff: (employee: number, data: CreateStaffRequest) => apiInstance.put(`/admin/updateStaff/${employee}`, data),

        deleteStaff: (staffId: number) => apiInstance.delete(`/admin/removeStaff/${staffId}`),

        getAllDoctors: () => apiInstance.get('/admin/doctors'),

        getAllStaffs: () => apiInstance.get('/admin/staffs'),

        getAllNurses: () => apiInstance.get('/admin/nurses'),

        getAllPatients: () => apiInstance.get('/admin/patients'),

        assignNurse: (doctorId: number, data: AssignNurseRequest) => apiInstance.put(`/admin/assignedNurse/${doctorId}`, data),

        assignDoctorShift: (data: AssignDoctorShiftRequest) => apiInstance.post('/admin/addSchedule', data),

        getAllDepartments: (): Promise<Department[]> => apiInstance.get('/admin/allDepartments'),

        addDepartment: (data: CreateDepartmentRequest) => apiInstance.post('/admin/addDepartment', data),


        // patient
        bookAppointment: (data: BookAppointmentRequest) => apiInstance.post('/users/bookAppointment', data),

        makePayment: (data: MakePaymentRequest) => apiInstance.post('/users/confirm', data),

        getDoctorsWithSpecialization: (specialization: string) => apiInstance.get(`/users/getDoctorWithSpecialization`, {
            params: { specialization }
        }),

        getUserPaymentHistory: () => apiInstance.get('/users/my-payments'),

        getUserMedicalRecordHistory: () => apiInstance.get('/users/viewMedicalRecord'),

        getUserAppointments: () => apiInstance.get('/users/viewAppointment'),

        cancelAppointment: (appointmentId: number) => apiInstance.put(`/users/appointments/cancel/${appointmentId}`),

        // doctor
        getDoctorInfo: () => apiInstance.get('/doctors/getDoctorInfo'),

        getAssignedShifts: () => apiInstance.get('/doctors/getDoctorSchedule'),

        getDoctorAppointments: () => apiInstance.get('/doctors/viewAppointment'),

        addMedicalRecord: (data: AddMedicalRecordRequest) => apiInstance.post('/doctors/addMedicalRecord', data),

        getMedicalRecords: () => apiInstance.get(`/doctors/viewMedicalRecord`),

        // nurse
        getNurseShifts: () => apiInstance.get('/nurses/getNurseSchedules'),

        getNurseMedicalRecords: () => apiInstance.get('/nurses/viewMedicalRecord'),

        // staff
        getAllAppointments: () => apiInstance.get('/staffs/viewAppointment'),

        updateAppointmentStatus: (appointmentId: number, data: UpdateAppointmentStatusRequest) => apiInstance.put(`/staffs/confirmedAppointment/${appointmentId}`, data),

        getAllMedicalRecords: () => apiInstance.get('/staffs/viewMedicalRecord'),

        createFee: (data: CreateFeeRequest) => apiInstance.post("/staffs/fees", data),

        updateFee: (feeId: number, data: CreateFeeRequest) => apiInstance.put(`/staffs/fees/${feeId}`, data),

        getAllFees: () => apiInstance.get(`/staffs/fees`),

        deleteFee: (feeId: number) => apiInstance.delete(`/staffs/fees/${feeId}`),

        createDepartment: (data: CreateDepartmentRequest) => apiInstance.post("/staffs/departments", data),

        getAllPayments: () => apiInstance.get('/staffs/payments'),

        getAllDepartments: () => apiInstance.get('/staffs/departments'),

        addDepartment: (data: CreateDepartmentRequest) => apiInstance.post('/staffs/addDepartment', data),
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