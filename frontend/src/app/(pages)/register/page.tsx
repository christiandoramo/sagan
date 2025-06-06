import * as React from 'react';
import { SaganContainer } from '../../components/SaganLogoContainer';
import { FormTitle } from '../../components/FormShared/FormTitle';
import { RegisterForm } from '../../components/RegisterForm';

function Register() {
    return (
        <div>
            <div className="flex">
                <SaganContainer />
                <div className="text-center text-black w-7/12">
                    <div className="m-auto flex flex-col justify-end items-center">
                        <div className="mt-6">
                            <FormTitle title="Cadastre-se!" />
                        </div>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
