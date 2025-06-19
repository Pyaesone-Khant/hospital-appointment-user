import { queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBookAppointment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["bookAppointment"],
        mutationFn: (data: BookAppointmentRequest) => CLIENT_API.bookAppointment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"]
            });
            showNotification({
                title: "Success",
                message: "Appointment booked successfully",
                color: "green"
            })
        }
    });

    return {
        bookAppointment: mutate,
        isLoading,
        ...rest
    }
};

export const useGetAppointments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["appointments"],
        queryFn: () => CLIENT_API.getUserAppointments(),
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

export const useMakePayment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["makePayment"],
        mutationFn: (data: MakePaymentRequest) => CLIENT_API.makePayment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"]
            });
            showNotification({
                title: "Success",
                message: "Payment made successfully",
                color: "green"
            })
        }
    });

    return {
        makePayment: mutate,
        isLoading,
        ...rest
    }
}

export const useGetUserPaymentHistory = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["paymentHistory"],
        queryFn: () => CLIENT_API.getUserPaymentHistory(),
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

export const useGetUserMedicalRecordHistory = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["medicalRecordHistory"],
        queryFn: () => CLIENT_API.getUserMedicalRecordHistory(),
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
        queryKey: ["doctorShifts"],
        queryFn: () => CLIENT_API.getDoctorShifts(),
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

export const useGetDoctorsByDepartment = (department: string) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["doctorsByDepartment", department],
        queryFn: () => CLIENT_API.getDoctorsWithSpecialization(department),
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