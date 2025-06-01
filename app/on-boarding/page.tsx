import { Doctors } from "@/components/Doctors"
import { Hero } from "@/components/Home"
import { Specialties } from "@/components/Specialties"

export default function Page() {
    return (
        <>
            <Hero />
            <Specialties />
            <Doctors />
        </>
    )
}
