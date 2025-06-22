import { PaymentMethod } from "@/constants";
import { Badge, Box, Card, Flex, Group, NumberFormatter, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { StatusBadge } from "../common";
import { MakePaymentModal } from "./MakePaymentModal";

export function PaymentCard(props: Payment) {

    const { id, amount, method, patientName, paymentDate } = props;

    return (
        <Card
            withBorder
            p={20}
            radius={8}
        >
            <article
                className="flex items-center justify-between gap-4"
            >
                <Group
                    gap={12}
                >
                    <Box
                        bg={getPaymentColor(method)}
                        className=" aspect-square rounded-full w-9 flex items-center justify-center "
                    >
                        <DynamicIcon
                            name={getPaymentIcon(method)}
                            size={18}
                            color="white"
                        />
                    </Box>

                    <article>
                        <Title
                            order={4}
                            fw={600}
                        >
                            Payment#{id.toString().padStart(4, '0')}
                        </Title>
                        <Text
                            size="sm"
                        >
                            Patient: {patientName}
                        </Text>
                    </article>
                </Group>
                <article>
                    <Title
                        order={4}
                        fw={600}
                        c={"green"}
                        className="flex justify-end"
                    >
                        {/* {amount ? `$${amount.toFixed(2)}` : "Pending"} */}
                        <NumberFormatter
                            value={amount || 0}
                            prefix="$"
                        />
                    </Title>
                    {
                        method ? (
                            <Text
                                fz={"sm"}
                            >
                                {dayjs(paymentDate).format("MMM D, YYYY")}
                            </Text>
                        ) : (
                            <StatusBadge
                                color="yellow"
                            >
                                Pending
                            </StatusBadge>
                        )
                    }
                </article>
            </article>

            <Flex
                mt={20}
                justify="space-between"
                align={"center"}
            >
                <Group
                    gap={12}
                >
                    <StatusBadge
                        color={getPaymentColor(method)}
                    >
                        {method ?? "N/A"}
                    </StatusBadge>
                    <Badge
                        size="lg"
                        color={method ? "black" : "red"}
                    >
                        {method ? "Completed" : "Pending"}
                    </Badge>
                </Group>

                {
                    !method && (
                        <MakePaymentModal
                            payment={props}
                        />
                    )
                }
            </Flex>
        </Card>
    )
}

const getPaymentIcon = (method: PaymentMethod): IconName => {
    switch (method) {
        case PaymentMethod.CreditCard:
            return "credit-card";
        case PaymentMethod.Cash:
            return "dollar-sign";
        case PaymentMethod.BankTransfer:
            return "banknote";
        case PaymentMethod.MobilePayment:
            return "smartphone-nfc";
        default:
            return "dollar-sign";
    }
}

const getPaymentColor = (method: PaymentMethod): string => {
    switch (method) {
        case PaymentMethod.CreditCard:
            return "blue";
        case PaymentMethod.Cash:
            return "green";
        case PaymentMethod.BankTransfer:
            return "orange";
        case PaymentMethod.MobilePayment:
            return "purple";
        default:
            return "gray";
    }
}