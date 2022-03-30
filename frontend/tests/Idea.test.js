
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Idea from '../src/pages/Idea/Idea';
import axios from 'axios';
// import App from "../src/App.js";


// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// });

const setup = () => render(<Idea />);



describe('Check Ideas Page ', () => {
    it('Check if the page has a search button', () => {
        setup();
        const search = screen.getByText('Search', { selector: 'button' });
        // expect(loginTrigger).toBeDefined();
        expect(search).not.toBe(null);
    });
    // it('Check if the page has an input for Password', () => {
    //     setup();

    // });
    // it('Check if the page has a Login button', () => {
    //     setup();

    // });

    it('ownerName is displayed correctly', async () => {
        // setup();

        const ideas = await axios.get("localhost:8000/ideas");
        const users = await axios.get("localhost:8000/users");
        const ownerName = users.data[0].name;
        // expect(data.status).toBe(200);
        expect(ownerName).toBe("Trong");
    });



})