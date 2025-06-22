import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function ChangePasswordModal() {

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Button
                variant="subtle"
                color="blue"
                size="md"
                onClick={toggle}
            >
                Change Password
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Change Password"
                centered
                zIndex={1000}
            >
                <ChangePasswordForm
                    onModalClose={toggle}
                />
            </Modal>
        </>
    )
}
