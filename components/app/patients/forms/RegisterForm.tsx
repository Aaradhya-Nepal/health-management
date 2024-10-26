"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl,} from "@/components/ui/form"
import {createUser} from "@/lib/actions/patient.actions"
import FormField from "@/components/app/form-components/CustomFormField";
import {FormFieldTypes} from "@/enums/FormFieldTypes";
import icons from "@/constants/icons";
import SubmitButton from "@/components/app/form-components/SubmitButton";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import routes from "@/constants/routes";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {GenderOptions} from "@/constants";
import {Label} from "@/components/ui/label";

const RegisterForm = ({user}: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            const newUser = await createUser(user);

            if (newUser) {
                router.push(routes.register.replace(":userId", newUser.id));
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
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
                <div className="flex flex-col gap-6 xl:flex-row">
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
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <FormField
                        control={form.control}
                        fieldType={FormFieldTypes.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                        placeholder=""
                        iconSrc={icons.phone.icon}
                        iconAlt={icons.phone.alt}
                    />
                    <FormField
                        control={form.control}
                        fieldType={FormFieldTypes.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                            onValueChange={field.onChange} defaultValue={field.value}>
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;