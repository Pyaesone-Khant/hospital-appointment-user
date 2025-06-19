import { JWTRoleEnum, queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetEmployees = (role: JWTRoleEnum) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["getAllStaffs", "getAllDoctors", "getAllNurses", role],
        queryFn: () => {
            switch (role) {
                case JWTRoleEnum.DOCTOR:
                    return CLIENT_API.getAllDoctors();
                case JWTRoleEnum.NURSE:
                    return CLIENT_API.getAllNurses();
                case JWTRoleEnum.STAFF:
                    return CLIENT_API.getAllStaffs();
                default:
                    break;
            }
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
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
                queryKey: ["getAllDoctors", "getAllNurses"]
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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllStaffs", "getAllDoctors", "getAllNurses"]
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
        mutationFn: ({ staffId, data }: { staffId: number; data: CreateStaffRequest }) => CLIENT_API.updateStaff(staffId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getAllStaffs", "getAllDoctors", "getAllNurses"]
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
                queryKey: ["getAllStaffs", "getAllDoctors", "getAllNurses"]
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}