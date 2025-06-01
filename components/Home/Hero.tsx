"use client";

import { useLoginContext } from "@/contexts/login.context";
import { Button } from "@mantine/core";

export function Hero() {

    const { openLoginModal } = useLoginContext();

    return (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16" >
            <div className="container mx-auto px-4 text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 ">Book Your Appointment with Top Doctors</h2>
                <p className="text-xl max-sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Access quality healthcare with our experienced medical professionals. Schedule appointments, view medical
                    records, and manage your health journey.
                </p>
                <Button
                    size="lg"
                    onClick={openLoginModal}
                    mt={20}
                >
                    Get Started
                </Button>
            </div>
        </section>
    )
}
