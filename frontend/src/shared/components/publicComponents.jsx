import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/Логотип белый 3 (rus).png';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import GamesIcon from '@mui/icons-material/Games';
import StoreIcon from '@mui/icons-material/Store';
import "./public.css"

export const Header =()=>{
    return(
        <AppBar position="sticky" className="app-bar">
                <Toolbar className="toolbar">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                
                <div className="icons-container">
                    <IconButton color="inherit">
                    <GamesIcon className="icon" />
                    </IconButton>
                    <IconButton color="inherit">
                    <StoreIcon className="icon" />
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
    );
}
export const Footer = () =>{
    return(
        <footer className="footer">
                    
                <div className="footer-content">
                    <a>
                        <img src={logo} alt="Logo" className="footer-logo" />
                    </a>
                    <div>
                        <p>«Hackathon Alabuga 2025 | MVP version».</p>
                        <p>© 2025 Your Company. All rights reserved.</p>
                    </div>
                </div>
        </footer>
    );
}