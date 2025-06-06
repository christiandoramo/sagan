import { useAuth } from '@/app/hooks/auth';
import { SaganSideBar } from '../../components/SaganSideBar';
import DataHomeUserNav from '../home/dataNav';

function HomeUser() {
    return (
        <div className="flex">
            <SaganSideBar />
            <div className="flex-grow w[900px] bg-neutral-100 items-center justify-center">
                <DataHomeUserNav />
            </div>
        </div>
    );
}
export default HomeUser;
