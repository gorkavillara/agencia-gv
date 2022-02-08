import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const FbForms = () => {
    const [data, setData] = useState({ name: "", phone: "", email: "" });
    const [loading, setLoading] = useState(false);
    const sendEmails = () => {
        setLoading(true);
        axios.post('/api/fb_forms', { action: 'sendNotification', data, client })
            .then(r => {
                toast.success("Email enviado correctamente")
                setData({ name: "", phone: "", email: "" })
                setLoading(false);
            })
            .catch(e => console.log(e))
    }

    const client = {
        name: "Aitziber",
        offer: "Andulación y lectura del pie",
        email: "aitziber.araquistain@gmail.com",
        trello: "aitziber79+1t9qjkgxod47ka5qenyk@boards.trello.com"
    }
    return (<>
        <div className='w-screen flex flex-col justify-center items-center'>
            <div className="max-w-4xl">
                <h1>Facebook Forms</h1>
                <div>
                    <h2>Empezamos con Aitara</h2>
                    <p>Este form enviará el email de notificación y otro de registro en Trello</p>
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            <span>Nombre</span>
                            <input className="input-text" disabled={loading} type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                        </label>
                        <label className="flex flex-col">
                            <span>Teléfono</span>
                            <input className="input-text" disabled={loading} type="text" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
                        </label>
                        <label className="flex flex-col">
                            <span>Email</span>
                            <input className="input-text" disabled={loading} type="text" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                        </label>
                        <button disabled={loading} className="px-4 py-2 bg-green-500 text-white font-bold rounded disabled:opacity-25" onClick={sendEmails}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
        <Toaster position="top-center" />
    </>
    )
}

export default FbForms
