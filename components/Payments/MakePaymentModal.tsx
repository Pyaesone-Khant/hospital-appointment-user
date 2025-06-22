import { PaymentMethod } from "@/constants";
import { useMakePayment } from "@/hooks/query-hooks/usePatient";
import { Button, Modal, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export function MakePaymentModal({
    payment
}: {
    payment: Payment;
}) {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useMakePayment();

    const form = useForm({
        initialValues: {
            totalAmount: payment.amount || 0,
            paymentMethod: PaymentMethod.Cash,
        },
        validate: {
            totalAmount: (value) => (value <= 0 ? "Amount must be greater than zero" : null),
            paymentMethod: (value) => (value ? null : "Payment method is required!"),
        }
    })

    const onMakePayment = (values: typeof form.values) => {

        const payload = {
            ...values,
            paymentId: payment.id,
        };

        mutate(payload, {
            onSuccess: () => {
                toggle(); // Close the modal on success
            },
        });
    }

    return (
        <>
            <Button
                onClick={toggle}
                size="sm"
            >
                Pay Now
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Make Payment"
                centered
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <form
                    onSubmit={form.onSubmit(onMakePayment)}
                    className="space-y-4"
                >
                    <NumberInput
                        label="Total Amount"
                        placeholder="Enter total amount"
                        {...form.getInputProps('totalAmount')}
                        withAsterisk
                        min={0}
                        hideControls
                        size="md"
                        readOnly
                    />

                    <Select
                        label="Payment Method"
                        placeholder="Select payment method"
                        data={Object.values(PaymentMethod)}
                        {...form.getInputProps('paymentMethod')}
                        withAsterisk
                    />

                    <Button
                        type="submit"
                        fullWidth
                        mt={40}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </form>
            </Modal>
        </>
    )
}
