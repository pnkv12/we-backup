import sgMail from '@sendgrid/mail'

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);
    const sendCreateIdea = (title, content) =>{
        const msg = {
            to: 'khanhhoanghatran@gmail.com',
            from: 'khanhhoanghatran@gmail.com',
            subject: `Create a successful Idea with title: ${title}`,
            text: `Employee successfully created a new idea with the content: ${content}`
        }
        sgMail
            .send(msg)
            .then(() =>{
                console.log('Email sent successfully!!!!!!!!');
            })
            .catch((error) =>{
                console.error(error);
            })
    
    }
export default sendCreateIdea;
    