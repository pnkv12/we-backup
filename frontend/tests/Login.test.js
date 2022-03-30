import LoginForm from "../src/pages/Login/LoginForm";
import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';



// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// });

const setup = () => render(<LoginForm />);



describe('LoginForm contains required elements', () => {
    it('Check if the page has an input for Username', () => {
        setup();
        expect(screen.getByText('Welcome to FPT Greenwich!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });
    it('Check if the page has an input for Password', () => {
        setup();
        expect(screen.getByText('Welcome to FPT Greenwich!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
    it('Check if the page has a Login button', () => {
        setup();
        const loginTrigger = screen.getByText('Login', { selector: 'button' });
        // expect(loginTrigger).toBeDefined();
        expect(loginTrigger).not.toBe(null);
    });

    // it('check if TextField exists', () => {
    //     setup();
    //     expect(screen.getByTestId('username')).toBeInTheDocument();
    // });



})

