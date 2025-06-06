import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { REVIEW_STATUS } from '@/app/utils/roles';

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    article: ArticleData;
    user: User;
}
interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    language: string;
    status: string;
    userId: string;
    rating: string;
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

interface User {
    id: string;
    name: string;
    email: string;
}

interface Rating {
    originality: string;
    contribution: string;
    writing: string;
    objectivity: string;
    textFidelity: string;
}
const ReviewModal: React.FC<ReviewModalProps> = ({
    open,
    onClose,
    article,
    user,
}) => {

    return (
        <>
            {article && article.status === REVIEW_STATUS.CLOSED && user &&
                <Modal open={open} onClose={onClose}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="flex justify-center items-center z-1 min-h-screen
            ">
                        <div className="p-6 bg-white rounded-md shadow-lg text-black 
                    min-h-[500px] max-h-[500px] max-w-[500px] min-w-[500px]
                    overflow-auto">
                            <h1 className="text-3xl font-semibold mb-4 text-black text-center ">Avaliação do artigo</h1>
                            <div className="p-4 w-full flex flex-col justify-end end items-end">
                                <div className="text-left"> {/* Div adicional para alinhar os itens à esquerda */}
                                    <p className='text-black opacity-50'>Avaliador</p>
                                    <h2 className="text-xl font-semibold mb-2 text-black">{user.name}</h2>
                                    <p className='text-black'>{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-4">

                                <div className="justify-between flex mt-2 p-2 border rounded-md">
                                    <span>Originalidade</span>
                                    <Button
                                        style={{ color: 'blue', cursor: 'auto' }}
                                    >
                                        {JSON.parse(article.rating).originality}
                                    </Button>
                                </div>
                                <div className="justify-between flex mt-2 p-2 border rounded-md">
                                    <span>Contribuição</span>
                                    <Button
                                        style={{ color: 'blue', cursor: 'auto' }}
                                    >
                                        {JSON.parse(article.rating).contribution}
                                    </Button>
                                </div>
                                <div className="justify-between flex mt-2 p-2 border rounded-md">
                                    <span>Escrita</span>
                                    <Button
                                        style={{ color: 'blue', cursor: 'auto' }}
                                    >
                                        {JSON.parse(article.rating).writing}
                                    </Button>
                                </div>
                                <div className="justify-between flex mt-2 p-2 border rounded-md">
                                    <span>Objetividade</span>
                                    <Button
                                        style={{ color: 'blue', cursor: 'auto' }}
                                    >
                                        {JSON.parse(article.rating).objectivity}
                                    </Button>
                                </div>
                                <div className="justify-between flex mt-2 p-2 border rounded-md">
                                    <span>Aderência ao tema</span>
                                    <Button
                                        style={{ color: 'blue', cursor: 'auto' }}
                                    >
                                        {JSON.parse(article.rating).textFidelity}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );

}

export default ReviewModal;