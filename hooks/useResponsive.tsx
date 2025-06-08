import { useMediaQuery } from "@mantine/hooks";

export function useResponsive() {

    const isSM = useMediaQuery("(min-width: 640px)");
    const isMD = useMediaQuery("(min-width: 768px)");
    const isLG = useMediaQuery("(min-width: 1024px)");
    const isXL = useMediaQuery("(min-width: 1280px)");
    const is2XL = useMediaQuery("(min-width: 1536px)");

    const isMobile = !isSM;
    const isTablet = isSM && !isMD;
    const isDesktop = isMD && !isLG;
    const isLargeDesktop = isLG && !isXL;
    const isExtraLargeDesktop = isXL && !is2XL;

    return {
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        isExtraLargeDesktop,
        isSM,
        isMD,
        isLG,
        isXL,
        is2XL
    };
}
