import { JWTRoleEnum } from "@/constants";
import { CLIENT_API } from "@/services/axios-client";
import { useQuery } from "@tanstack/react-query";

export const useGetMedicalRecords = (role: JWTRoleEnum) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ["medicalRecords", role],
        queryFn: () => {
            switch (role) {
                case JWTRoleEnum.DOCTOR:
                    return CLIENT_API.getMedicalRecords();
                case JWTRoleEnum.NURSE:
                    return CLIENT_API.getNurseMedicalRecords();
                case JWTRoleEnum.USER:
                    return CLIENT_API.getUserMedicalRecordHistory();
                default:
                    return CLIENT_API.getAllMedicalRecords();
            }
        },

    });

    return {
        data,
        isLoading,
        ...rest
    };
}