import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Park from './ParkCard';
import arches from '../../../assets/arches.png';
import badlands from '../../../assets/badlands.png';
import glacier from '../../../assets/glacier.png';
import roosevelt from '../../../assets/roosevelt.png';
import ActivitiesCard from './ActivitiesCard';

const parks = [
    {
        name: 'Arches National Park',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: arches
    },
    {
        name: 'Badlands National Park',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: badlands
    },
    {
        name: 'Glacier National Park',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: glacier
    },
    {
      name: 'Roosevelt National Park',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
      img: roosevelt
  }
]


const Parks = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Container>
            <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h6" component="div">
                National Parks
            </Typography>
            <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
                Select a National Park to view upcoming activities
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    parks.map(park => <Park
                        key={park.name}
                        park={park}
                    ></Park>)
                }
            </Grid>
        </Container>

    </Box>
    );
};

export default Parks;