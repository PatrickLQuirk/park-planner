import React from 'react';
import Grid from '@mui/material/Grid';
//import hiker from '../../assets/hiker.jpeg';
import { Typography, Button, Container } from '@mui/material';
import Box from '@mui/material/Box';


const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}

const Banner = () => {
    return (
        <Container sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item style={{ ...verticalCenter, textAlign: 'left' }} xs={12} md={6}>
                    <Box>
                        <Typography variant="h3">
                            Adventure <br />
                            Is Out There
                        </Typography>
                        <Typography variant="h6" sx={{ my: 3, fontSize: 13, fontWeight: 300, color: 'gray' }}>
                            You don't have to spend countless hours lost in the wilderness looking for the perfect adventure, it's waiting for you here! Create your personalized intinerary for your next National Park visit.
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: '#5CE7ED' }}>Pick a Park</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter} >
                    <img style={{ width: '350px' }} /*src={hiker}*/ alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Banner;