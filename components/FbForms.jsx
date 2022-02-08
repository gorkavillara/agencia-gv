import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const client = {
  name: "Aitziber",
  offer: "Reflexología y lectura del pie por 40€",
  email: "aitziber.araquistain@gmail.com",
  trello: "aitziber79+1t9qjkgxod47ka5qenyk@boards.trello.com",
};

const FbForms = () => {
  const [data, setData] = useState({ name: "", phone: "", email: "" });
  const [clientData, setClientData] = useState(client);
  const [loading, setLoading] = useState(false);
  const sendEmails = () => {
    setLoading(true);
    axios
      .post("/api/fb_forms", {
        action: "sendNotification",
        data,
        client: clientData,
      })
      .then((r) => {
        toast.success("Email enviado correctamente");
        setData({ name: "", phone: "", email: "" });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl">
          <h1>Facebook Forms</h1>
          <div>
            <h2>Empezamos con Aitara</h2>
            <p>
              Este form enviará el email de notificación y otro de registro en
              Trello
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <span>Nombre</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </label>
                <label className="flex flex-col">
                  <span>Teléfono</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span>Email</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <span>Nombre Cliente</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={clientData.name}
                    onChange={(e) =>
                      setClientData({ ...clientData, name: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span>Nombre Oferta</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={clientData.offer}
                    onChange={(e) =>
                      setClientData({ ...clientData, offer: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span>Email Cliente</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={clientData.email}
                    onChange={(e) =>
                      setClientData({ ...clientData, email: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col">
                  <span>Trello Cliente</span>
                  <input
                    className="input-text"
                    disabled={loading}
                    type="text"
                    value={clientData.trello}
                    onChange={(e) =>
                      setClientData({ ...clientData, trello: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span>Asunto</span>
                <input
                  className="input-text"
                  disabled={true}
                  type="text"
                  value={`${clientData.offer} - ${data.name}`}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </label>
              <label className="flex flex-col">
                <span>Texto del email</span>
                <div className="input-text">
                  <p>Hola {clientData.name},</p>
                  <p>
                    Tienes un nuevo cliente potencial para la oferta{" "}
                    {clientData.offer}: <br />
                    Nombre: {data.name}
                    <br />
                    Teléfono: {data.phone}
                    <br />
                    Email: {data.email}
                  </p>
                </div>
              </label>
              <button
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded disabled:opacity-25"
                onClick={sendEmails}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default FbForms;
