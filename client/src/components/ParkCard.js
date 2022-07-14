import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ParkCard = (props) => {
    const { name, description, img, _id } = props.park;
    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
                <CardMedia
                    component="img"
                    style={{ width: 'auto', height: '80px', margin: '0 auto' }}
                    image={require(`../assets/${img}`)}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <br></br>
                    <Link to={`/search/${_id}`}>
                        <Button variant="contained" style={{ backgroundColor: '#4caf50' }}>View Activities</Button>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ParkCard;