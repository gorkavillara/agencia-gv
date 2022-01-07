const mailchimp = require('@mailchimp/mailchimp_marketing');
const crypto = require("crypto")

const Mailchimp = async (req, res) => {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { action, credentials, emails, data } = body;
    if (action === "checkInfo") {
        mailchimp.setConfig({
            apiKey: process.env.NEXT_PUBLIC_GIVECOACHING_APIKEY,
            server: process.env.NEXT_PUBLIC_GIVECOACHING_SERVER
        });
        
        const interestGroup = "8db94572a0";
        try {
            const r = await mailchimp.lists.listInterestCategoryInterests(
                process.env.NEXT_PUBLIC_GIVECOACHING_LISTID,
                interestGroup
            );
            res.status(200).json({ r });
        } catch (e) {
            console.log(e)
            res.status(500).json({ e });
        }
    }
    if (action === "addUserToGroup") {
        const { nombre, email, group_id } = data;
        console.log(data);
        const email_hash = crypto.createHash('md5').update(email).digest('hex');
        let contacto = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                "FNAME": nombre,
                "BIRTHDAY": "01/19",
            },
            interests: {
                [group_id]: true
            }
        };
        mailchimp.setConfig({
            apiKey: process.env.NEXT_PUBLIC_GIVECOACHING_APIKEY,
            server: process.env.NEXT_PUBLIC_GIVECOACHING_SERVER
        });
        try {
            const r = await mailchimp.lists.setListMember(
                process.env.NEXT_PUBLIC_GIVECOACHING_LISTID,
                email_hash,
                { ...contacto, status_if_new: 'subscribed' }
            );
            res.status(200).json({ r });
        } catch (e) {
            console.log(e)
            res.status(500).json({ e });
        }
    }
    if (action === "getSequences") {
        try {
            const apiKey = "ce32d1f5fd2a1e5a2cde5c61c5b8459c-us17";
            const server = "us17"
            // const info = await axios.get(`https://${}.api.mailchimp.com/3.0/campaigns?count=10&offset=10`)
            // const info = await mailchimp.campaigns.get('8e6b24620f');
            // const info = await mailchimp.animations.get('8e6b24620f').catch(e => console.log(e));
            // const info = await mailchimp.animations.list()
            // const info = await mailchimp.automations.create({
            //     recipients: {},
            //     trigger_settings: { workflow_type: "abandonedCart" }
            // }).catch(e => console.log(e))
            // const info = await mailchimp.campaigns.create({ type: "regular" }).catch(e => console.log(e))
            const { id } = await mailchimp.campaigns.replicate('8e6b24620f');
            await mailchimp.campaigns.update(id, {
                settings: {
                    subject_line: "Nueva subject line",
                    preview_text: "Nuevo preview text....",
                    from_name: "Gorka",
                    reply_to: "gorkavillara@gmail.com"
                }
            });
            await mailchimp.campaigns.setContent(id, {
                template: {
                    id: 138
                },
                html: "<html><h1>Este es el email</h1><p>Hola este es el email de prueba</p></html>"
            })
            const info = await mailchimp.campaigns.get(id);
            return res.status(200).json(info);
        } catch (e) {
            console.log(e)
            return res.status(500).json({ e })
        }
    }
}

export default Mailchimp;
