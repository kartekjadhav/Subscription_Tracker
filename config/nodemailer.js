import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const useremail = 'kartek2810@gmail.com';  

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: useremail,
        pass: EMAIL_PASSWORD
    }
});

export default transporter;