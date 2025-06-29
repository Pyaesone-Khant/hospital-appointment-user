import { JWTRoleEnum, queryClient } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { useUserStore } from "@/states/zustand/user";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBookAppointment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["bookAppointment"],
        mutationFn: (data: BookAppointmentRequest) => CLIENT_API.bookAppointment(data),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({
                    queryKey: ["appointments"]
                });
                showNotification({
                    title: "Success",
                    message: "Appointment booked successfully",
                    color: "green"
                })
            } else {
                showNotification({
                    title: "Error",
                    message: data?.message || "Failed to book appointment",
                    color: "red"
                })
            }
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
};

export const useGetAppointments = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["appointments"],
        queryFn: () => CLIENT_API.getUserAppointments(),
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
                queryKey: ["appointments", "paymentHistory"]
            });
            showNotification({
                title: "Success",
                message: "Payment made successfully",
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

export const useGetUserPaymentHistory = () => {

    const jwt = useUserStore((state) => state.jwt);

    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["paymentHistory"],
        queryFn: () => CLIENT_API.getUserPaymentHistory(),
        enabled: jwt?.role === JWTRoleEnum.USER, // Only fetch if the user is not a regular user
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
    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useGetAvailableDoctors = () => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["doctorShifts"],
        queryFn: () => CLIENT_API.getAvailableDoctors(),

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

    });

    return {
        data,
        isLoading,
        ...rest
    };
}

export const useCancelAppointment = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["cancelAppointment"],
        mutationFn: (appointmentId: number) => CLIENT_API.cancelAppointment(appointmentId),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: ["appointments"]
                });
                showNotification({
                    title: "Success",
                    message: "Appointment cancelled successfully",
                    color: "green"
                })
            } else {
                showNotification({
                    title: "Error",
                    message: data?.message || "Failed to cancel appointment",
                    color: "red"
                })
            }
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}