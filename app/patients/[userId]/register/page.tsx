import React from 'react';
import source from "@/constants/source";
import Image from "next/image";
import RegisterForm from "@/components/app/patients/forms/RegisterForm";
import {getUser} from "@/lib/actions/patient.actions";

const Register = async ({params: {userId}}: SearchParamProps) => {
    const user = await getUser(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <div className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src={source.patient}
                        width={1000}
                        height={1000}
                        alt="patient"
                        className="mb-12 h-10 w-fit"
                    />
                    <RegisterForm user={user}/>
                    <div className="copyright py-12">
                        © 2021 Patient Management System. All rights reserved.
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