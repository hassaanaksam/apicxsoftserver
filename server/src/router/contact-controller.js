const express = require("express");
const Contact = require("../model/contact")
const router = express.Router();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("");

router.post("/contact", async (req, res) => {
    try {
        const contactsData = req.body;
        const contact = new Contact(contactsData);
        const contactData = await contact.save()

        const emailData = {
            to: 'contact@solutioncarriers.com',
            from: 'hassaantahirrock@gmail.com',
            subject: 'New Client email',
            text: JSON.stringify(contactsData),
        };

        sgMail.send(emailData)
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.log('Error sending email:', error);
                
            });

        return res.status(200).json({ message: "Contact successfully saved", data: contactData })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/contact', async (req, res) => {

    const contacts = await Contact.findAll();

    res.json({
        status: true,
        contacts: contacts
    })

})

module.exports = router;