'use client';
import * as React from 'react';
import { SaganSideBar } from '../../components/SaganSideBar';
import { ArticleCard } from '../../components/ArticleCard';
import { getArticles } from '@/services/articles';


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

function PublishedArticles() {
    const [publishedArticles, setPublishedArticles] = React.useState<any[]>([])
    React.useEffect(() => {
        async function findArticles() {
            const foundArticles = await getArticles();
            if (foundArticles) {
                setPublishedArticles(foundArticles);
            }

        }
        try {
            findArticles();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <>
            {publishedArticles.length === 0 ? (
                <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
                    <div className="container flex">
                        <div className="mr-[120px]">
                            <SaganSideBar />
                        </div>
                        <div className="main w-full text-justify justify-center flex items-center flex-col m-auto">
                            <div className="mt-9 text-3xl font-semibold mb-20 text-black text-center m-auto ml-[0] pl-[20px]">
                                Artigos Publicados
                            </div>
                            <div className="w-full text-center text-black bg-white pb-6 pt-6 pr-4 pl-4 shadow-custom rounded-lg">
                                Nenhum artigo encontrado.
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
                        <div className="container flex">
                            <div className="mr-[120px]">
                                <SaganSideBar />
                            </div>
                            <div className="main w-full text-justify justify-center flex items-center flex-col m-auto">
                                <div className="mt-9 text-3xl font-semibold mb-20 text-black text-center m-auto ml-[0] pl-[20px]">
                                    Artigos Publicados
                                </div>
                                <div className="w-full text-center text-black bg-white pb-0 pt-6 pr-4 pl-4 shadow-custom rounded-lg">
                                    {publishedArticles.map((article: ArticleData) => (
                                        <div key={article.id} className="flex  text-black w-full">
                                            <ArticleCard
                                                article={article}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default PublishedArticles;
