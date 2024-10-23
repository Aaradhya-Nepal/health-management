"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form,} from "@/components/ui/form"
import FormField from "@/components/app/form-components/CustomFormField";
import {FormFieldTypes} from "@/enums/FormFieldTypes";
import icons from "@/constants/icons";
import SubmitButton from "@/components/app/form-components/SubmitButton";
import {useState} from "react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
})

const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <FormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="name"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc={icons.user.icon}
                    iconAlt={icons.user.alt}
                />
                <FormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="email"
                    label="Email"
                    placeholder="john@example-mail.com"
                    iconSrc={icons.email.icon}
                    iconAlt={icons.email.alt}
                />
                <FormField
                    control={form.control}
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    name="phone"
                    label="Phone number"
                    placeholder="(555) 123-4567"
                    iconSrc={icons.phone.icon}
                    iconAlt={icons.phone.alt}
                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default PatientForm;