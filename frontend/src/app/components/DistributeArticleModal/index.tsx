import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getProfessors } from '@/services/users';
import { createArticleReviewer } from '@/services/articles';
import { ARTICLE_ROLES, REVIEW_STATUS } from '@/app/utils/roles';
import { AlertToast } from '../AlertToast';
import { useRouter } from 'next/navigation'

interface DistributeArticleModalProps {
    open: boolean;
    onClose: () => void;
    selectedProfessors: User[];
    setSelectedProfessors: React.Dispatch<React.SetStateAction<User[]>>;
    onProfessorSelect: (professor: User) => void;
    setUsersIds: React.Dispatch<React.SetStateAction<string[]>>;
    setRoles: React.Dispatch<React.SetStateAction<string[]>>;
    articleId: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    college: {
        id: number;
        name: string;
        initials: string;
    };
}

const DistributeArticleModal: React.FC<DistributeArticleModalProps> = ({
    open,
    onClose,
    setSelectedProfessors,
    onProfessorSelect,
    setUsersIds,
    selectedProfessors,
    setRoles,
    articleId,
}) => {
    const [searchText, setSearchText] = useState('');
    const [foundProfessors, setFoundProfessors] = useState<User[]>([])
    const [searchedProfessors, setSearchedProfessors] = useState<User[]>([])
    const [message, setMessage] = useState({ status: '', description: '' });
    const router = useRouter()


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        setSearchText(e.target.value);
        const filteredProfessors = foundProfessors.filter((professor) =>
            professor.name.toLowerCase().startsWith(text) ||
            professor.email.toLowerCase().startsWith(text)
        );
        if (e.target.value !== '')
            setSearchedProfessors(filteredProfessors);
        else
            setSearchedProfessors(foundProfessors);
    };


    async function findProfessors() {
        getProfessors().then((professors) => {
            // pegando só os professores não selecionados
            const filteredFoundProfessors = professors.filter((professor: User) =>
                !selectedProfessors.find((selectedProfessor) =>
                    selectedProfessor.id === professor.id)
            );
            console.log(filteredFoundProfessors);
            if (selectedProfessors.length === 0) {
                setFoundProfessors(professors);
            } else {
                setFoundProfessors(filteredFoundProfessors);
            }
        })
    }
    useEffect(() => {
        findProfessors();
    }, [])

    useEffect(() => {
        findProfessors();
    }, [selectedProfessors]);

    const handleDistributeArticle = async (e: any) => {
        if (selectedProfessors.length !== 1) {
            setMessage({
                status: 'error',
                description: 'Escolha 1(um) avaliador para o artigo',
            });
            return;
        }
        const formDataComum = {
            usersIds: [selectedProfessors[0].id], roles: [ARTICLE_ROLES.REVIEWER],
            status: REVIEW_STATUS.ON_REVIEW
        }

        console.log(formDataComum)
        createArticleReviewer({ articleId, ...formDataComum }).then((articleWithReviewer) => {
            console.log("articleWithReviewer", articleWithReviewer)
            setMessage({
                status: 'success', description: `O avaliador ${selectedProfessors[0].name
                    } foi atribuído com sucesso`
            })
            router.push('/published-articles')
        }).catch((error) => {
            setMessage({ status: 'error', description: 'Ocorreu um erro ao distribuir artigo' })
        })
    }

    return (
        <Modal open={open} onClose={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="flex justify-center items-center z-1 min-h-screen
            ">
                {foundProfessors.length !== 0 &&
                    <div className="p-6 bg-white rounded-md shadow-lg text-black 
                    min-h-[500px] max-h-[500px] max-w-[500px] min-w-[500px]
                    overflow-auto">
                        <div className='text-black'>
                            <TextField
                                label="Buscar professores"
                                value={searchText}
                                onChange={handleSearchChange}
                                fullWidth
                                placeholder="Busque pelo nome ou email"
                                sx={{ backgroundColor: 'grey' }}
                                style={{ color: 'black' }}
                                InputProps={{
                                    style: { color: 'black' },
                                }}
                            />
                        </div>
                        {/* Selecionados */}
                        <div className="mt-4">
                            <h3>Professores Selecionados</h3>
                            {selectedProfessors.length && selectedProfessors.map((professor) => (
                                <div key={professor.id} className="mt-2 p-2 border rounded-md
                                    justify-between flex">
                                    <span>{professor.name}</span>
                                    <Button
                                        onClick={() => {
                                            setSelectedProfessors((prevState) =>
                                                prevState.filter((p) => p.id !== professor.id)
                                            );
                                            setUsersIds((prevState) =>
                                                prevState.filter((id) => id !== professor.id)
                                            );
                                            setRoles((prevState) => {
                                                const rolesCopy = [...prevState];
                                                rolesCopy.pop();
                                                return rolesCopy;
                                            });
                                        }}
                                        style={{ color: 'red' }} // Estilo para o botão "Remover"
                                    >
                                        Remover
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {/* seleção */}
                        <div className="mt-4">
                            {searchedProfessors
                                .map((professor) => (
                                    <div key={professor.id} className="
                                        justify-between flex
                                        mt-2 p-2 border rounded-md">
                                        <span>{professor.name}</span>
                                        <Button
                                            onClick={() => onProfessorSelect(professor)}
                                            style={{ color: 'blue' }} // Estilo para o botão "Adicionar"
                                        >
                                            Adicionar
                                        </Button>
                                    </div>
                                ))}
                        </div>
                        <div className="mt-4 justify-center items-center">
                            {selectedProfessors.length > 0 &&
                                <Button
                                    onClick={handleDistributeArticle}
                                    style={{ color: 'blue' }} // Estilo para o botão "Adicionar"
                                >
                                    Distribuir Artigo
                                </Button>
                            }
                        </div>
                        <AlertToast message={message} setMessage={setMessage} />
                    </div>
                }
            </div>
        </Modal>
    );

}

export default DistributeArticleModal;