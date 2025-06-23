import { AvatarProps, ButtonProps, createTheme, MantineThemeOverride, NumberInput, NumberInputProps, PasswordInputProps, SelectProps, TextareaProps, TextInputProps } from "@mantine/core";

const defaultProps = {
    size: "md",
    radius: "sm",
};

export const theme: MantineThemeOverride = createTheme({
    primaryColor: "dark",
    fontFamily: "Poppins, sans-serif",
    components: {
        Button: {
            defaultProps: {
                ...defaultProps,
                fw: 500,
            } as ButtonProps,
        },
        TextInput: {
            defaultProps: {
                ...defaultProps,
                variant: "filled",
                withAsterisk: true,
            } as TextInputProps,
        },
        PasswordInput: {
            defaultProps: {
                ...defaultProps,
                variant: "filled",
                withAsterisk: true,
            } as PasswordInputProps,
        },
        Avatar: {
            defaultProps: {
                bg: "linear-gradient(135deg, #999, #333)",
            } as AvatarProps,
        },
        Select: {
            defaultProps: {
                ...defaultProps,
                variant: "filled",
            } as SelectProps,
        },
        Textarea: {
            defaultProps: {
                ...defaultProps,
                variant: "filled",
            } as TextareaProps
        },
        NumberInput: {
            defaultProps: {
                ...defaultProps,
                variant: "filled",
            } as NumberInputProps
        }
    }
}
)