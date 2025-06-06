"use client"
import * as React from 'react';
import { ArticleView } from '../../../components/ArticleView';
import { SaganSideBar } from '../../../components/SaganSideBar';
import { useAuth } from '@/app/hooks/auth';
import { ARTICLE_ROLES, REVIEW_STATUS, EVENT_ROLES, USER_ROLES } from '@/app/utils/roles';
import { ArticleReviewForm } from '@/app/components/ArticleReviewForm';
import { ArticleReviewStatus } from '@/app/components/ArticleReviewStatus';
import { getArticleById } from '@/services/articles';

interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    status: string;
    language: string;
    rating: string;
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

function ArticleScreen(props: any) {
    const { user } = useAuth()
    const [article, setArticle] = React.useState<ArticleData>({} as ArticleData);
    const { id } = props.params
    const [isReviewer, setIsReviewer] = React.useState<boolean>(false);
    const [userEventRole, setUserEventRole] = React.useState<string>('');
    const [userArticleRole, setUserArticleRole] = React.useState<string>('');
    // TESTE mockado
    // faltando relação evento a artigo

    React.useEffect(() => {
        async function findArticle() {
            const foundArticle: ArticleData = await getArticleById(id);
            if (foundArticle) {
                setArticle(foundArticle);
                const userArticleFound = foundArticle.users.find((ur) => ur.user.id === user.id)
                if (userArticleFound?.role === ARTICLE_ROLES.REVIEWER) {
                    setIsReviewer(true);
                    setUserArticleRole(ARTICLE_ROLES.REVIEWER)
                    // mostrar componente de article review form
                    // TESTAR ROLE EVENT_ARTICLE _ROLE MOCADO
                    setUserEventRole(EVENT_ROLES.PARTICIPANT)
                }
                else if (userArticleFound?.role === ARTICLE_ROLES.AUTHOR) {
                    setUserEventRole(EVENT_ROLES.PARTICIPANT)
                    setUserArticleRole(ARTICLE_ROLES.AUTHOR)
                }
                else if (userArticleFound?.role === ARTICLE_ROLES.COAUTHOR) {
                    setUserEventRole(EVENT_ROLES.PARTICIPANT)
                    setUserArticleRole(ARTICLE_ROLES.COAUTHOR)
                }
                else if (user.role === USER_ROLES.ADMIN) { // Na verdade deve ser em relação ao evento
                    setUserEventRole(EVENT_ROLES.OWNER) // Na verdade deve ser em relação ao evento
                }
                else if (user.role === USER_ROLES.TECH_MANAGER) { // Na verdade deve ser em relação ao evento
                    setUserEventRole(EVENT_ROLES.PARTICIPANT) // Na verdade deve ser em relação ao evento
                }
                else {
                    setUserEventRole(EVENT_ROLES.PARTICIPANT)
                }
                console.log(foundArticle);
            }
        }
        try {
            findArticle();
        } catch (err) {
            console.log(err);
        }
    }, [id])

    return (
        <div className="w-full min-h-screen" style={{ background: '#fafafb' }}>
            <div className="container flex">
                <div className="mr-[100px]">
                    <SaganSideBar />
                </div>
                <div className="main w-full text-justify justify-center  flex items-center flex-col m-auto">
                    <div className="w-full mb-32 bg-white">
                        {article && <ArticleView article={article} />}
                        {article && (
                            <div className="text-center text-black w-full">
                                <div className="mt-9 text-3xl font-semibold mb-4 text-black text-center">
                                    Status do Artigo
                                </div>
                                <ArticleReviewStatus articleRole={userArticleRole}
                                    eventRole={userEventRole} article={article} />
                            </div>
                        )}
                        {article && isReviewer && article.status === REVIEW_STATUS.ON_REVIEW
                            && (
                                <div className="text-center text-black w-full">
                                    <div className="mt-9 text-3xl font-semibold mb-4 text-black text-center">
                                        Avaliar Artigo
                                    </div>
                                    <ArticleReviewForm article={article} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleScreen;
