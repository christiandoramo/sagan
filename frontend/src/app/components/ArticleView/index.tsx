'use client';
import React from 'react';

interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    language: string;
    userId: string;
    file: {
        filename: string;
        url: string;
    }
};

export function ArticleView({ article }: { article: ArticleData }) {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = article?.file?.url;
        link.target = '_blank'
        link.download = article.file.filename;
        //link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // URL de um arquivo PDF de teste
        //link.download = 'dummy.pdf'; // Nome do arquivo de teste
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {
                article &&
                <div className="container mx-auto p-4 shadow-custom bg-white">
                    <h1 className="text-3xl font-semibold mb-4 text-black text-center ">{article.title}</h1>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-black">Área</h2>
                        <p className=' text-black'>{article.knowledgeArea}</p>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-black">Idioma</h2>
                        <p className=' text-black'>{article.language}</p>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-black">Palavras-chave</h2>
                        <ul>
                            {article.keywords &&
                                article.keywords.split(',').map((keyWord, index) => (
                                    <li className=' text-black' key={index}>{keyWord.trim()}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-black">Evento</h2>
                        <p className=' text-black'>Nome do evento</p>
                    </div>
                    <div className="flex justify-center p-4 mt-6">
                        {article.file === null ?
                            <button disabled className=" 
                            opacity-30
                            w-[140px] rounded-lg h-[50px] text-white bg-pink-500 text-center font-Poppins text-base font-normal" >
                                Baixar Artigo
                            </button > :
                            <button onClick={handleDownload} className="w-[140px] rounded-lg h-[50px] text-white bg-pink-500 text-center font-Poppins text-base font-normal" >
                                Baixar Artigo
                            </button >
                        }

                    </div>
                </div>
            }
        </>



    );
};
