import { JWTRoleEnum } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointments = (role: JWTRoleEnum) => {

    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["appointments", role],
        queryFn: () => {
            switch (role) {
                case JWTRoleEnum.USER:
                    return CLIENT_API.getUserAppointments();
                case JWTRoleEnum.DOCTOR:
                    return CLIENT_API.getDoctorAppointments();
                case JWTRoleEnum.STAFF:
                    return CLIENT_API.getAllAppointments();
            }
        },
    });

    return {
        data,
        isLoading,
        ...rest
    };
}