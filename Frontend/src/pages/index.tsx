import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import ShowToast from "../components/toast";
import CInput from "../components/input";
import CButton from "../components/button";

const schema = yup.object().shape({
  email: yup.string().required("Campo requerido").email("Correo inválido"),
  password: yup.string().required("Campo requerido"),
});

const Auth: NextPage = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: any) => {
    const response: any = await ShowToast({ path: '/user/login', method: "POST", body })
    if (!response.status) return
    router.push("/teams");
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "58%",
            height: "100%",
          }}
        >
          <div style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
            <Image src="/imgs/logo-login.png"
              width={350}
              height={500}
              style={{
                // width: '80%', height: '80%', objectFit: 'contain'
              }}
              alt="imagen" />
          </div>
        </div>
        <div
          style={{
            width: "35%",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "100%",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form style={{ width: '80%' }}>
              <h2 style={{ textAlign: 'center', fontFamily: 'monospace' }}>FUTBOLTIME</h2>
              <CInput
                control={control}
                name="email"
                label="Correo electrónico"
              />
              <CInput
                control={control}
                name="password"
                label="Contraseña"
                type="password"
              />
              <CButton
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                text="Ingresar"
              />
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default Auth;
