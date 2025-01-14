"use client"

import { client } from "@/app/lib/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { Modal } from "./ui/modal";
import LoadingSpinner from "./loading-spinner";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";

export const PaymentSuccessModal = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { data, isPending } = useQuery({
        queryKey: ["user-plan"],
        queryFn: async () => {
            const res = await client.payment.getUserPlan.$get();
            return await res.json();
        },
        refetchInterval: (query) => {
            return query.state.data?.plan === "PRO" ? false : 1000;

        },
    })
    const handleClose = () => {
        setIsOpen(false);
        router.push("/dashboard");

    }
    const isPaymentSuccessfull = data?.plan === 'PRO' ? true : false;

    return (
        <Modal
            showModal={isOpen}
            setShowModal={setIsOpen}
            onClose={handleClose}
            className="px-6 pt-6"
            preventDefaultClose={!isPaymentSuccessfull}
        >
            <div className="flex flex-col items-center">
                {isPending || !isPaymentSuccessfull ? (
                    <div className="flex flex-col items-center justify-center h-64 ">
                        <LoadingSpinner className="mb-4" />
                        <p className="text-lg/7 font-medium text-gray-900">
                            Upgrading your account😃...
                        </p>

                        jsx
                        Copy code
                        <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
                            Hang tight! We’re upgrading your account—just a moment, we promise it’ll be worth the wait!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
                            <img
                                src="/brand-asset-heart.png"
                                alt="payment Successfull"
                                className="h-full w-full object-cover"
                            />

                        </div>

                        <div className="mt-6 flex flex-col items-center gap-1 text-center">
                            <p className="text-lg/7 tracking-tight font-medium text-pretty">
                                Upgrade complete! 🎉
                            </p>
                            <p className="text-gray-600 text-sm/6 text-pretty">
                                Look at you, all fancy and <span className="relative">
    <del className="text-gray-400">hacked</del>
    <span className="ml-1 font-semibold text-green-600">Upgraded</span>
  </span>!🥳 Thanks for supporting PingPanda—now go enjoy those sweet Pro perks like the legend you are 💫 !
                            </p>
                        </div>
                        <div className="mt-8 w-full">
                            <Button onClick={handleClose} className="h-12 w-full">
                                <CheckCircle className="mr-2 size-5"/>
                                Go to dashboard
                            </Button>

                        </div>

                    </>
                )}

            </div>


        </Modal>
    )

}
