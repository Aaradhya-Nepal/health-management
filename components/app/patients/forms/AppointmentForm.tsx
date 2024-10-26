"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form,} from "@/components/ui/form"
import FormField from "@/components/app/form-components/CustomFormField";
import {FormFieldTypes} from "@/enums/FormFieldTypes";
import SubmitButton from "@/components/app/form-components/SubmitButton";
import {useState} from "react";
import {useRouter} from "next/navigation";
import routes from "@/constants/routes";
import {Doctors} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import {getAppointmentSchema} from "@/lib/validation";
import {createAppointment} from "@/lib/actions/appointment.actions";

const AppointmentForm = ({
                             userId,
                             patientId,
                             type,
                         }: {
    userId: string;
    patientId: string;
    type: "create" | "cancel" | "schedule";
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "cancelled";
                break;
            default:
                status = "pending";
        }

        try {
            if (type === "create" && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                };

                const newAppointment = await createAppointment(appointmentData);

                if (newAppointment) {
                    form.reset();
                    router.push(routes.newAppointmentSuccess.replace(":userId", userId).replace(":appointmentId", newAppointment.$id));
                }
            }


        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in seconds</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <FormField
                            fieldType={FormFieldTypes.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor, i) => (
                                <SelectItem key={doctor.name + i} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt="doctor"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </FormField>

                        <FormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <FormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />

                            <FormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter notes"
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <FormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton isLoading={isLoading}
                              className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
}

export default AppointmentForm;