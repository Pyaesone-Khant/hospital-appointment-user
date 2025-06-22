import { queryClient, RoleEnum } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetEmployees = (role: RoleEnum) => {
    const { data, isLoading, ...rest } = useQuery<Doctor[] | Staff[] | Nurse[], Error, Doctor[] | Staff[] | Nurse[]>({
        queryKey: ["getAllStaffs", "getAllDoctors", "getAllNurses", role],
        queryFn: () => {
            switch (role) {
                case RoleEnum.DOCTOR:
                    return CLIENT_API.getAllDoctors();
                case RoleEnum.NURSE:
                    return CLIENT_API.getAllNurses();
                case RoleEnum.STAFF:
                    return CLIENT_API.getAllStaffs();
                default:
                    return CLIENT_API.getAllStaffs()
            }
        },

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetAllPatients = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["getAllPatients"],
        queryFn: () => CLIENT_API.getAllPatients(),

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetAllDoctorShifts = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["getAllDoctorShifts"],
        queryFn: () => CLIENT_API.getAllDoctorShifts(),

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useAssignDoctorShift = () => {

    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["assignDoctorShift"],
        mutationFn: (data: AssignDoctorShiftRequest) => CLIENT_API.assignDoctorShift(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllDoctorShifts"]
            })
            showNotification({
                title: "Success",
                message: "Doctor shift assigned successfully!",
                color: "green"
            })
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useAssignNurseToDoctor = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["assignNurseToDoctor"],
        mutationFn: ({ doctorId, data }: { doctorId: number; data: AssignNurseRequest }) => CLIENT_API.assignNurse(doctorId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllDoctors", "getAllNurses", "getAllDoctorShifts"]
            });
            showNotification({
                title: "Success",
                message: "Nurse assigned to doctor successfully!",
                color: "green"
            });
        },
        onError: (error: string) => {
            showNotification({
                title: "Error",
                message: error ?? "An error occurred while assigning nurse to doctor",
                color: "red"
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useCreateEmployee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["createStaff"],
        mutationFn: (data: CreateStaffRequest) => CLIENT_API.createStaff(data),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: ["getAllUsers"]
                });
                showNotification({
                    title: "Success",
                    message: "Employee created successfully",
                    color: "green"
                })
            } else {
                showNotification({
                    title: "Error",
                    message: data.message ?? "An error occurred while creating employee",
                    color: "red"
                });
            }
        },
        onError: (error: string) => {
            showNotification({
                title: "Error",
                message: error ?? "An error occurred while creating employee",
                color: "red"
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useUpdateEmployee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["updateStaff"],
        mutationFn: ({ employeeId, data }: { employeeId: number; data: CreateStaffRequest }) => CLIENT_API.updateStaff(employeeId, data),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: ["getAllUsers"]
                });
                showNotification({
                    title: "Success",
                    message: "Employee updated successfully",
                    color: "green"
                });
            } else {
                showNotification({
                    title: "Error",
                    message: data.message ?? "An error occurred while updating employee",
                    color: "red"
                });
            }
        },
        onError: (error: string) => {
            showNotification({
                title: "Error",
                message: error ?? "An error occurred while updating employee",
                color: "red"
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useDeleteEmployee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["deleteStaff"],
        mutationFn: (staffId: number) => CLIENT_API.deleteStaff(staffId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllUsers"]
            });
            showNotification({
                title: "Success",
                message: "Employee deleted successfully",
                color: "green"
            });
        },
        onError: (error: string) => {
            showNotification({
                title: "Error",
                message: error ?? "An error occurred while deleting employee",
                color: "red"
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useCreateDepartment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["createDepartment"],
        mutationFn: (data: CreateDepartmentRequest) => CLIENT_API.addDepartment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allDepartments"]
            });
            showNotification({
                title: "Success",
                message: "Department created successfully",
                color: "green"
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    };
}

export const useGetAllDepartments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["allDepartments"],
        queryFn: () => CLIENT_API.getAllDepartments(),

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetAllUsers = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["getAllUsers"],
        queryFn: () => CLIENT_API.getAllUsers(),

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetCurrentUser = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: () => CLIENT_API.getCurrentUser(),
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        ...rest
    };
}