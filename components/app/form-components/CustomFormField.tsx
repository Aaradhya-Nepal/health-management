import {E164Number} from "libphonenumber-js/core";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Control} from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {Checkbox} from "@/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {FormFieldTypes} from "@/enums/FormFieldTypes";

interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    minDate?: any;
    maxDate?: any;
    selectsMultiple?: any;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldTypes;
}

const RenderInput = ({field, props}: { field: any; props: CustomProps }) => {
    switch (props.fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldTypes.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldTypes.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="NP"
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            );
        case FormFieldTypes.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
        case FormFieldTypes.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onSelect={(date: any) => field.onChange(date)}
                            dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={props.showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldTypes.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={props.placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldTypes.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null;
        default:
            return null;
    }
};

const CustomFormField = (props: CustomProps) => {
    const {control, name, label} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}: any) => (
                <FormItem className="flex-1">
                    {props.fieldType !== FormFieldTypes.CHECKBOX && label && (
                        <FormLabel className="shad-input-label">{label}</FormLabel>
                    )}
                    <RenderInput field={field} props={props}/>

                    <FormMessage className="shad-error"/>
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;