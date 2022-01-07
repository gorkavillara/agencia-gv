import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "mail.gorkavillar.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "gorka@gorkavillar.com", // generated ethereal user
        pass: "#Gu1630830U01?", // generated ethereal password
    },
});


export default async function (req, res) {
    const { action, data, client } = req.body;
    if (action === "sendNotification") {
        const { name, phone, email } = data;
        let info = [await transporter.sendMail({
            from: 'Gorka Villar <gorka@gorkavillar.com>', // sender address
            to: client.email, // list of receivers
            subject: `${client.offer} - ${name}`, // Subject line
            text: `Hola ${client.name}, Tienes un nuevo cliente potencial: Nombre: ${name}, Teléfono: ${phone}, Email: ${email}`, // plain text body
            html: `<p>Hola ${client.name},</p><p>Tienes un nuevo cliente potencial para la oferta ${client.offer}: <br />Nombre: ${name}<br />Teléfono: ${phone}<br />Email: ${email}</p>`, // html body
        })];

        if (client.trello) {
            info.push(await transporter.sendMail({
                from: 'Gorka Villar <gorka@gorkavillar.com>', // sender address
                to: client.trello, // list of receivers
                bcc: 'gorkavillara@gmail.com',
                subject: `${name}`, // Subject line
                text: `Nombre: ${name}, Teléfono: ${phone}, Email: ${email}`, // plain text body
                html: `<p>Nombre: ${name}<br />Teléfono: ${phone}<br />Email: ${email}</p>`, // html body
            }))
        }
        return res.status(200).json({ info });
    }
}