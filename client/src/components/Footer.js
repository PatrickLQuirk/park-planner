import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link
} from "@material-ui/core";
import {
    Security,
    Info
} from "@material-ui/icons";

const Footer = () => <>
        <Grid bg='success' variant='dark' expand='lg' container justify="center" style={{minHeight: "212px"}}>
            <Grid container item sm={6} xs={11} justify="space-between">
                <Grid item sm={5} xs={12}>
                    <Security color="action" />
                    <Typography paragraph>
                        The donations made on this site are sent through a secured connection and processed by Stripe. This site is compliant with the Payment Card Industry and Data Security Standard. Read more about Stripe security <Link href="https://stripe.com/docs/security/stripe" target="_blank" alt="Stripe">here</Link>.
                    </Typography>
                </Grid>
                <Grid item sm={5} xs={11}>
                    <Info color="action" />
                    <Typography paragraph>
                        This Web App is fully responsive. Made in <Link href="https://reactjs.org/" target="_blank">ReactJS</Link> 
                        </Typography>
                </Grid>
            </Grid>
        </Grid>
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">©2022</Typography>
            </Toolbar>
        </AppBar>
    </>

export default Footer;