'use client';
import { SaganSideBar } from '../../components/SaganSideBar';
import { SubmissionForm } from '../../components/ArticleSubmissionForm';

function ArticleSubmission() {
    return (
        <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
            <div className="container flex">
                <div className="z-[999]">
                    <SaganSideBar />
                </div>

                <div className="flex flex-col m-auto">
                    <h1 className="text-[#043133] font-Poppins text-4xl font-semibold m-auto pb-3">
                        Envie seu Artigo
                    </h1>

                    <div
                        className="flex bg-[#FFF] drop-shadow-xl w-[718px] h-[685px]"
                        style={{ alignItems: 'flex-start' }}
                    >
                        <div className="flex mx-auto">
                            <SubmissionForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleSubmission;
