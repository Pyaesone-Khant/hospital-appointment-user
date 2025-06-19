import { queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllAppointments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["allAppointments"],
        queryFn: () => CLIENT_API.getAllAppointments(),
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

export const useUpdateAppointmentStatus = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["updateAppointmentStatus"],
        mutationFn: (payload: { appointmentId: number, data: UpdateAppointmentStatusRequest }) => CLIENT_API.updateAppointmentStatus(payload.appointmentId, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allAppointments"]
            });
            showNotification({
                title: "Success",
                message: "Appointment status updated successfully",
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

export const useGetAllMedicalRecords = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["allMedicalRecords"],
        queryFn: () => CLIENT_API.getAllMedicalRecords(),
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

export const useCreateFee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["createFee"],
        mutationFn: (data: CreateFeeRequest) => CLIENT_API.createFee(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allFees"]
            });
            showNotification({
                title: "Success",
                message: "Fee created successfully",
                color: "green"
            });
        }
    });

    return {
        createFee: mutate,
        isLoading,
        ...rest
    };
}

export const useUpdateFee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["updateFee"],
        mutationFn: (payload: { feeId: number, data: CreateFeeRequest }) => CLIENT_API.updateFee(payload.feeId, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allFees"]
            });
            showNotification({
                title: "Success",
                message: "Fee updated successfully",
                color: "green"
            });
        }
    });

    return {
        updateFee: mutate,
        isLoading,
        ...rest
    };
}

export const useGetAllFees = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["allFees"],
        queryFn: () => CLIENT_API.getAllFees(),
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

export const useDeleteFee = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["deleteFee"],
        mutationFn: (feeId: number) => CLIENT_API.deleteFee(feeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allFees"]
            });
            showNotification({
                title: "Success",
                message: "Fee deleted successfully",
                color: "green"
            });
        }
    });

    return {
        deleteFee: mutate,
        isLoading,
        ...rest
    };
}

export const useCreateDepartment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["createDepartment"],
        mutationFn: (data: CreateDepartmentRequest) => CLIENT_API.createDepartment(data),
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
        createDepartment: mutate,
        isLoading,
        ...rest
    };
}

export const useGetAllPayments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["allPayments"],
        queryFn: () => CLIENT_API.getAllPayments(),
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