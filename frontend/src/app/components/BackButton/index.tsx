import React from 'react';
export function BackButton({ title }: { title: string }) {
    function handleBack() {
        window.history.back();
    }
    return (
        < button onClick={handleBack} className="w-[140px] rounded-lg h-[50px] text-black bg-white text-center font-Poppins text-base font-normal" >
            {title}
        </button >
    )
}