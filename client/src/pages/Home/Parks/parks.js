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
        description: 'Discover a landscape of contrasting colors, land forms, and textures unlike any other. The park has over 2,000 natural stone arches, hundreds of soaring pinnacles, massive rock fins, and giant balanced rocks. This red-rock wonderland will amaze you with its formations, refresh you with its trails, and inspire you with its sunsets.',
        img: arches
    },
    {
        name: 'Badlands National Park',
        description: 'The rugged beauty of the Badlands draws visitors from around the world. These striking geologic deposits contain one of the world’s richest fossil beds. Ancient horses and rhinos once roamed here. The park’s 244,000 acres protect an expanse of mixed-grass prairie where bison, bighorn sheep, prairie dogs, and black-footed ferrets live today.',
        img: badlands
    },
    {
        name: 'Glacier National Park',
        description: 'A showcase of melting glaciers, alpine meadows, carved valleys, and spectacular lakes. With over 700 miles of trails, Glacier is a paradise for adventurous visitors seeking wilderness steeped in human history. Relive the days of old through historic chalets, lodges, and the famous Going-to-the-Sun Road.',
        img: glacier
    },
    {
      name: 'Roosevelt National Park',
      description: 'When Theodore Roosevelt came to Dakota Territory to hunt bison in 1883, he was a skinny, young, spectacled dude from New York. He could not have imagined how his adventure in this remote and unfamiliar place would forever alter the course of the nation. The rugged landscape and strenuous life that TR experienced here would help shape a conservation policy that we still benefit from today.',
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