import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getArticleById } from '@/services/articles';
import { REVIEW_STATUS } from '@/app/utils/roles';


interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    status: string;
    language: string;
    rating: Rating;
    userId: string;
    file: {
        filename: string;
        url: string;
    }
    users: {
        user: {
            id: string, name: string, email: string
        }
        , role: string
    }[];
};


interface Rating {
    originality: string;
    contribution: string;
    writing: string;
    objectivity: string;
    textFidelity: string;
}

export const ArticleCard = ({ article }: { article: ArticleData }) => {

    let text, color, inabilitado, bgButtonColor;
    const router = useRouter()
    const bgCardColor = 'bg-[#EFEFEF]'

    if (article.status === REVIEW_STATUS.ON_REVIEW) {
        text = 'Avaliando';
        color = 'text-article-on-review'
        bgButtonColor = 'bg-custom-red'
    } else if (article.status === REVIEW_STATUS.PENDING) {
        text = 'Pendente';
        color = 'text-article-pending'
        bgButtonColor = 'bg-custom-orange'
    } else if (article.status === REVIEW_STATUS.CLOSED) {
        text = 'Avaliado';
        color = 'text-article-closed'
        bgButtonColor = 'bg-custom-green'
    }

    function handleGoToArticle() {
        router.push('/article-screen/' + article.id)
    }

    return (
        <>
            {article
                &&
                <div className={`rounded-lg w-full px-[22px] py-[15px] mb-4 flex justify-between items-center ${bgCardColor} backdrop-filter-blur-[2px]`}>
                    <div className="whitespace-nowrap text-lg font-bold truncate flex-grow-1 max-w-[400px]">
                        {article.title}
                    </div>
                    <div className='w-6/12 flex ml-auto shrink'>
                        <div className={`min-w-[162px] w-[162px] h-[44px] rounded-full cursor-default shrink ml-auto px-[40px] py-[11px]  bg-[${color}] flex flex-nowrap ${bgButtonColor} mr-[32px]`}>
                            <div className={`shrink font-semibold ${color} whitespace-nowrap flex-nowrap m-auto`}>{text}</div>
                        </div>
                        <button onClick={handleGoToArticle} disabled={inabilitado} className={`min-w-[162px] w-[162px] h-[44px] font-semibold disabled:opacity-20 px-2 py-1 bg-gray-200 text-black rounded-full mr-[10px]`}>
                            Ver mais
                        </button>
                    </div>
                </div>

            }
        </>
    );


}