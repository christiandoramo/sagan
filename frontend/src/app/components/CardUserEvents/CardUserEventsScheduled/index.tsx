import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { SignUpEventButton } from '../../ComponentsHomeUser/SignUpEventButton'; 
import Stack from '@mui/material/Stack';
import pontoVerde from "../../../../public/images/icone Ponto verde.svg";
import tresPontos from "../../../../../public/images/icone tres pontos.svg";
import Image from 'next/image';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface UserEventsScheduledProps {
  image: string, // Alterado para string se o backend estiver fornecendo a URL da imagem
  description: string,
  EventName:string,
  EventDay:string;
  EventMonth:string;
  EventHour:string;
}
export default function UserEventsScheduled({image, description, EventName,EventDay,EventMonth,EventHour}: UserEventsScheduledProps) {
    return (
        <div className='' style={{ position: 'relative', background: "white", height: "360px", width: "379px", borderRadius: "20px"}}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px', textAlign: 'start' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              
            </Stack>
            
            <Image src={tresPontos} alt="..."/>
          </div>
          <Card sx={{ width: 379,height:365, background: 'white', borderRadius: '10px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150px"
                image={image}
                alt="image event"
              />
              <CardContent style={{ height: "90px,",padding:'15px' }}>
                <Typography gutterBottom variant="h6" component="div" color="black" style={{textAlign:"center", marginBottom:'0px',padding:'5px'}}>
                  {EventName}
                </Typography>
                <Typography variant="body2" color="#6A6A6A" style={{ display: "flex-row", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="caption" style={{ color: '#1F3255', fontSize: '9px', marginBottom: '4px' }}>{EventMonth}</Typography>
                    <span style={{padding:'10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <h1 style={{ height: '28px', width: '33px', fontSize: '28px', color: '#F5167E', marginTop: '0px', marginRight: '15px',
                        marginLeft:'5px', }}>{EventDay}</h1>
                        {description}
                    </div>
                    <Typography variant="caption" style={{ color: '#1F3255', fontSize: '9px', marginTop: '4px' }}>{EventHour}</Typography>
      
                    </span>
    
                    
                    </Typography>
              </CardContent>
            </CardActionArea>
    
          </Card>
        </div>
      );
    }
    