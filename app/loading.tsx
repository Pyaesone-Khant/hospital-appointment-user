import { Box, LoadingOverlay } from "@mantine/core";

export default function loading() {
    return (
        <Box
            pos="relative"
        >
            <LoadingOverlay
                visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}
            />
        </Box>
    )
}
