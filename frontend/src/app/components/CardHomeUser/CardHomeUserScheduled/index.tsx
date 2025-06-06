import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SignUpEventButton } from '../../ComponentsHomeUser/SignUpEventButton'; 
import Stack from '@mui/material/Stack';
import tresPontos from "../../../../../public/images/icone tres pontos.svg";
import Image from 'next/image';
import { CardActionArea } from '@mui/material';

interface HomeUserCardScheduledProps {
  image: string, // Alterado para string se o backend estiver fornecendo a URL da imagem
  description: string,
  EventName:string,
  EventDay:string;
  EventMonth:string;
  EventHour:string;
}
export default function HomeUserCardScheduled({image, description, EventName,EventDay,EventMonth,EventHour}: HomeUserCardScheduledProps) {
  return (
    <div className='' style={{ position: 'relative', background: "white", height: "360px", width: "379px", borderRadius: "20px"}}>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px', textAlign: 'start' }}>
        <Stack direction="row" spacing={1} alignItems="center"></Stack>
        <Image src={tresPontos} alt="..."/>
      </div>
      <Card sx={{ width: 379,height:365, background: 'white', borderRadius: '10px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="1500px"
            image={image}
            alt="image event"
          />
          <CardContent style={{ height: "90px,",padding:1,paddingRight:10, }}>
            <Typography gutterBottom variant="h6" component="div" color="black" style={{textAlign:"center",paddingBottom:'0px',marginBottom:"0px"}}>
              {EventName}
            </Typography>
            <Typography variant="body2" color="#6A6A6A" style={{ display: "flex-row", flexDirection: "column", alignItems: "center", }}>
                <Typography variant="caption" style={{ color: '#1F3255', fontSize: '9px', marginBottom: '0px' }}>{EventMonth}</Typography>
                <span style={{ marginRight: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <h1 style={{ height: '28px', width: '33px', fontSize: '28px', color: '#F5167E', marginTop: '0px', marginRight: '15px',
                    marginLeft:'5px' }}>{EventDay}</h1>
                    {description}
                </div>
                <Typography variant="caption" style={{ color: '#1F3255', fontSize: '9px', marginTop: '4px' }}>{EventHour}</Typography>
                </span>
                </Typography>
          </CardContent>
        </CardActionArea>

        <div className='flex justify-center mb-15'>
          <SignUpEventButton title="Inscreva-se" />
        </div>
      </Card>
    </div>
  );
}