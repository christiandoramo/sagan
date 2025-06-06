import Image from 'next/image';
import logoImage from '../../../../public/images/logo-sagan.png';
import { FormTitle } from '../../components/FormShared/FormTitle';
import { LoginForm } from '../../components/LoginForm';

function Login() {
    return (
        <div>
            <div className="flex">
                {/*Divider Lane*/}
                <div className="bg-[#1F3255] w-2/5">
                    <div className="flex justify-center items-center h-screen">
                        <Image src={logoImage} alt="logo Sagan" />
                    </div>
                </div>

                <div className="text-center text-black w-7/12 flex items-center justify-center flex-col">
                    <div className="mt-9">
                        <FormTitle title="Seja bem-vindo(a)!" />
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default Login;
