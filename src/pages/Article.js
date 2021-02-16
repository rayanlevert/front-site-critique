import React from 'react';
import { useParams } from 'react-router-dom';
import ListBook from '../components/Book/ListBook';
import Game from '../components/Game/Game';
import ListGame from '../components/Game/ListGame';

export default function Article (){
    const { genre }= useParams();
    
    return (
        <>  
        <div>
        {
            {
            'game': <ListGame />,
            'book': <ListBook />
            }[genre]
         }
        </div>
        </>
    );
}
