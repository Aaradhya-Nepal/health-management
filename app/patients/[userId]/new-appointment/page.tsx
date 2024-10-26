import React from 'react';
import source from "@/constants/source";
import Image from "next/image";
import AppointmentForm from "@/components/app/patients/forms/AppointmentForm";
import {getPatient} from "@/lib/actions/patient.actions";

const Appointment = async ({params: {userId}}: SearchParamProps) => {
    const patient = await getPatient(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <div className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src={source.patient}
                        width={1000}
                        height={1000}
                        alt="patient"
                        className="mb-12 h-10 w-fit"
                    />
                    <AppointmentForm userId={userId} type="create" patientId={patient && patient.$id}/>
                    <div className="copyright mt-10 py-12">
                        © 2021 Patient Management System. All rights reserved.
                    </div>
                </div>
            </div>
            <Image
                src={source.appointmentImage}
                height={1000}
                width={1000}
                alt="appointment"
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    );
};

export default Appointment;