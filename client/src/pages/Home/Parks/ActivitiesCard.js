import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ActivitiesCard = (props) => {
    const { title, description, startTime, endTime } = props.activity;
    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {startTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {endTime}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ActivitiesCard;