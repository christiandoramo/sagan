'use client';
import * as React from 'react';

interface FormTitleProps {
    title: String
}
export const FormTitle: React.FC<FormTitleProps> = ({title}) => {
    return (
        <h1 className="text-form-title text-5xl font-semibold">{title}</h1>
    )
};