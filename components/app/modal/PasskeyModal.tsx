"use client";

import React, {useEffect, useState} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import icons from "@/constants/icons";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import routes from "@/constants/routes";
import config from "@/config";
import {decryptKey, encryptKey} from "@/lib/utils";


const PasskeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const path = usePathname();
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");

    const closeModal = () => {
        setOpen(false);
        router.push(routes.home);
    }

    const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);
        if (path) {
            if (accessKey === config.ADMIN_PASSKEY) {
                setOpen(false);
                router.push(routes.adminRoute);
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]);

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (passkey === config.ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);

            localStorage.setItem("accessKey", encryptedKey);

            setOpen(false);
        } else {
            setError("Invalid passkey. Please try again.");
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">Admin Access
                        Verification
                        <Image
                            src={icons.close.icon}
                            alt={icons.close.alt}
                            width={20}
                            height={20}
                            onClick={() => closeModal()}
                            className="cursor-pointer"
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot className="shad-otp-slot" index={0}/>
                            <InputOTPSlot className="shad-otp-slot" index={1}/>
                            <InputOTPSlot className="shad-otp-slot" index={2}/>
                            <InputOTPSlot className="shad-otp-slot" index={3}/>
                            <InputOTPSlot className="shad-otp-slot" index={4}/>
                            <InputOTPSlot className="shad-otp-slot" index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default PasskeyModal;