import { JWTRoleEnum, queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAssignedShifts = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["assignedShifts"],
        queryFn: () => CLIENT_API.getAssignedShifts(),

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
        },
        onError: (error: string) => {
            showNotification({
                title: "Error",
                message: error ?? "Failed to add medical record",
                color: "red"
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
    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetDoctorPatients = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["doctorPatients"],
        queryFn: () => CLIENT_API.getDoctorPatients(),

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

    });

    return {
        data,
        isLoading,
        ...rest
    };
};

export const useGetShitSchedule = (role: JWTRoleEnum) => {
    const { data, isLoading, ...rest } = useQuery<DoctorShift[] | NurseShift[] | undefined>({
        queryKey: ["shiftSchedule", role],
        queryFn: () => {
            switch (role) {
                case JWTRoleEnum.DOCTOR:
                    return CLIENT_API.getAssignedShifts();
                case JWTRoleEnum.NURSE:
                    return CLIENT_API.getNurseShifts();
                default:
                    return [];
            }
        },
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

    });

    return {
        data,
        isLoading,
        ...rest
    };
}