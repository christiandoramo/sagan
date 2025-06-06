import { SaganSideBar } from '../../components/SaganSideBar';
import Profile from '../../components/Profile';

function UserProfile() {
    return (
        <div className="flex ">
            <div className="w-[1400px] h-[900px] bg-neutral-100 flex justify-center ">
                <div className="w-[87px] h-[34px] text-slate-950 text-2xl font-bold font-['Poppins'] mt-4"></div>
                <SaganSideBar />
                <div className="flex w-[423px] h-[780px] bg-white align-items">
                    <Profile />
                </div>
            </div>
        </div>
    );
}
export default UserProfile;
