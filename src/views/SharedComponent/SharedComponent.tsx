import {
  BanknotesIcon,
  ChevronRightIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { CURRENCY_REGEX } from "../../constants/regex.constants";

const SharedComponent: React.FC<{
  type: number;
}> = ({ type }) => {

    const [amount, setAmount] = React.useState(10000000);
  return (
    <div className="w-full bg-white h-full rounded-3xl shadow-md p-10 flex flex-col gap-4">
      <h1 className="text-3xl text-center font-bold">
        {type === 1
          ? "Patrocina este proyecto"
          : "Bienvenido al equipo"}
      </h1>
      <main className="flex flex-col  w-1/3 mx-auto gap-4">
        {/* Payment Select M,ethod Form with Tailwind and other option in the oipotions */}
        {type === 1 && (
          <>
            <form className="flex flex-col">
              <label>Elige el monto con el que deseas patrocinar</label>
              <p>
                Monto: <b>${amount.toString().replace(CURRENCY_REGEX, ".")}</b>
              </p>
              <input
                style={{ padding: 0 }}
                type="range"
                min={10000000}
                max={90000000}
                step={5000000}
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
                className="create-form__field-range-card-input"
              />
            </form>
            <form className="flex flex-col space-y-4 gap-2">
              <p>Selecciona el metodo de pago</p>
              <span className="flex border-2 border-amber-500 bg-amber-50 justify-between gap-8 p-4 rounded-md items-center cursor-pointer">
                <CreditCardIcon className="size-6 text-amber-500" />
                <span className="flex flex-col gap-2 flex-1">
                  <p className="font-bold">Tarjeta de credito</p>
                  <p className="text-xs italic text-zinc-400">
                    Transacción segura
                  </p>
                </span>
                <ChevronRightIcon className="size-6 text-amber-800" />
              </span>
              <span className="flex border-2 border-emerald-500 bg-emerald-50 justify-between gap-8 p-4 rounded-md items-center cursor-pointer">
                <BanknotesIcon className="size-6 text-emerald-500" />
                <span className="flex flex-col gap-2 flex-1">
                  <p className="font-bold">Consignacion Bancaria</p>
                  <p className="text-xs italic text-zinc-400">
                    Transacción segura
                  </p>
                </span>
                <ChevronRightIcon className="size-6 text-emerald-800" />
              </span>
              <span className="flex border-2 border-blue-500 bg-blue-50 justify-between gap-8 p-4 rounded-md items-center cursor-pointer">
                <img
                  src="https://inmobiliarialamansion.com/wp-content/uploads/2019/01/logo-pse.png"
                  alt="PSE"
                  className="w-12 h-12"
                />
                <span className="flex flex-col gap-2 flex-1">
                  <p className="font-bold">Pago Electronico</p>
                  <p className="text-xs italic text-zinc-400">
                    Transacción segura
                  </p>
                </span>
                <ChevronRightIcon className="size-6 text-blue-500" />
              </span>
            </form>
            <a className="bg-blue-500 text-white p-2 rounded-md hover:text-white text-center" href="https://www.paypal.com/us/home" target="_blank">
              Pagar
            </a>
          </>
        )}
        {
            type === 0 && (
                <div className="flex flex-col gap-4">
                    <img src="https://i.pinimg.com/originals/be/81/df/be81dfb06285a3f7b455d1d708e3d6b0.gif" className="m-auto" width={500} alt="trabajo-en-equipo" />
                    <p className="text-center">¡Gracias por unirte a nuestro equipo! Ahora puedes disfrutar de todos los beneficios de ser parte de nuestra propuesta.</p>
                    <p>Aqui algunos temas a considerar:</p>
                    <ul className="*:underline *:italic *:pl-4">
                        {/* Reglas y requisitos para trabajar en pryecto de crowfunding ejemplo*/}
                        <li>Deberas participar activamente en los eventos de desarrollo</li>
                        <li>Deberas cumplir con los plazos de entrega</li>
                        <li>Deberas cumplir con los requerimientos de calidad</li>

                    </ul>
                    <a className="bg-blue-500 text-white p-2 rounded-md hover:text-white text-center" target="_blank" href="https://meet.google.com/landing">Comenzar</a> 
                </div>
            )
        }
      </main>
    </div>
  );
};

export default SharedComponent;
