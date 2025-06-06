import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { SignUpEventButton } from '../ComponentsHomeUser/SignUpEventButton';
import Stack from '@mui/material/Stack';
import pontoVerde from '../../../../public/images/icone Ponto verde.svg';
import tresPontos from '../../../../public/images/icone tres pontos.svg';
import Image from 'next/image';
import { CardActionArea } from '@mui/material';

interface HomeUserCardProps {
    image: string; // Alterado para string se o backend estiver fornecendo a URL da imagem
    description: string;
    EventName: string;
}
export default function HomeUserCard({ image, description, EventName }: HomeUserCardProps) {
    return (
        <div
            className=""
            style={{
                position: 'relative',
                background: 'white',
                height: '360px',
                width: '379px',
                borderRadius: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px',
                    textAlign: 'start',
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Image src={pontoVerde} alt="on" style={{ marginLeft: '5px' }} />
                    <span
                        style={{
                            color: '#F5167E',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginLeft: '20px',
                        }}
                    >
                        ACONTECENDO AGORA
                    </span>
                </Stack>
                {/* Ícone do YouTube abaixo de eventName */}
                <Image src={tresPontos} alt="..." />
            </div>
            <Card sx={{ width: 379, height: 365, background: 'white', borderRadius: '10px' }}>
                <CardActionArea>
                    <div className="h-40">
                        <CardMedia
                            component="img"
                            image={image}
                            alt="image event"
                            className="h-full"
                            sx={{ objectFit: 'contain' }}
                        />
                    </div>
                    <CardContent style={{ height: '90px,', padding: '7px' }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            color="black"
                            style={{ textAlign: 'center' }}
                        >
                            {EventName}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#6A6A6A"
                            style={{
                                display: 'flex-row',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ marginRight: '8px', textOverflow: 'ellipsis' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <YouTubeIcon
                                        style={{
                                            fontSize: '40px',
                                            color: 'red',
                                            marginRight: '15px',
                                        }}
                                    />
                                    {description}
                                </div>
                            </span>
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <div className="flex justify-center mb-15">
                    <SignUpEventButton title="Inscreva-se" />
                </div>
            </Card>
        </div>
    );
}
