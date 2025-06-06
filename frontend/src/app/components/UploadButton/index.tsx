'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadButton({ onChange }: any) {
    return (
        <Button
            onChange={onChange}
            component="label"
            className="text-black bg-[#F0F1F3] flex text-center text-sm rounded-[10px] h-[31px] my-[30px] w-[220px]"
        >
            Escolher Arquivo
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}
