import { useResponsive } from "@/hooks";
import { useGetUserPaymentHistory } from "@/hooks/query-hooks/usePatient";
import { Text, Title } from "@mantine/core";
import { PaymentCard } from "./PaymentCard";

export function UserPaymentHistory() {

    const { data } = useGetUserPaymentHistory();

    const { isMobile } = useResponsive();

    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md !space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Payment History
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Complete record of all your payments and transactions
                </Text>
            </article>
            <div

            >
                {
                    data?.length ? (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {
                                data.map((payment) => (
                                    <PaymentCard
                                        key={payment.id ?? JSON.stringify(payment)}
                                        {...payment}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <Text
                            c={"gray.6"}
                            fz={isMobile ? "sm" : "md"}
                            className="text-center"
                        >
                            No payment history found.
                        </Text>
                    )
                }
            </div>
        </section>
    )
}
