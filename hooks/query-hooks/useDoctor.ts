import { queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAssignedShifts = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["assignedShifts"],
        queryFn: () => CLIENT_API.getAssignedShifts(),
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

export const useGetDoctorAppointments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["doctorAppointments"],
        queryFn: () => CLIENT_API.getDoctorAppointments(),
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

export const useAddMedicalRecord = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["addMedicalRecord"],
        mutationFn: (data: AddMedicalRecordRequest) => CLIENT_API.addMedicalRecord(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["doctorAppointments"]
            });
            showNotification({
                title: "Success",
                message: "Medical record added successfully",
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

export const useGetMedicalRecords = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["medicalRecords"],
        queryFn: () => CLIENT_API.getMedicalRecords(),
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

// nurse
export const useGetNurseShifts = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["nurseShifts"],
        queryFn: () => CLIENT_API.getNurseShifts(),
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

export const useGetNurseMedicalRecords = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["nurseMedicalRecords"],
        queryFn: () => CLIENT_API.getNurseMedicalRecords(),
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