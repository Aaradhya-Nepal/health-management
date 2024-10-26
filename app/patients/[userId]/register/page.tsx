import React from 'react';
import source from "@/constants/source";
import Image from "next/image";
import Link from "next/link";
import routes from "@/constants/routes";
import RegisterForm from "@/components/app/patients/forms/RegisterForm";
import {getUser} from "@/lib/actions/patient.actions";

const Register = async ({params: {userId}}: SearchParamProps) => {
    const user = await getUser(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <div className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src={source.patient}
                        width={1000}
                        height={1000}
                        alt="patient"
                        className="mb-12 h-10 w-fit"
                    />
                    <RegisterForm user={user}/>
                    <div className="text-14-regular mt-20 flex justify-between">
                        <div className="justify-end text-dark-600 xl:text-left">
                            © 2021 Patient Management System. All rights reserved.
                        </div>
                        <Link href={routes.admin} className="text-green-500">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
            <Image
                src={source.registerImage}
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;