import React from 'react';
import {Button} from "@/components/ui/button";
import source from "@/constants/source";
import Image from "next/image";

type ButtonProps = {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode
};

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
    return (
        <div>
            <Button type="submit" disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
                {isLoading ? (
                    <div className="flex items-center gap-4">
                        <Image
                            src={source.loader}
                            alt="loader"
                            width={24}
                            height={24}
                            className="animate-spin"
                        />
                        Loading...
                    </div>
                ) : children}
            </Button>
        </div>
    );
};

export default SubmitButton;