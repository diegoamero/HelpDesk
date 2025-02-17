import Image from "next/image";
import stylesG from "./stylesG.module.css";

export default function Home() {
  return (
    <div className={stylesG.mainHome}>
      <main>
        <section className={stylesG.section}>
          <div className={stylesG.text__container}>
            <h2>¿Cómo funciona?</h2>
            <p>
              <b>Registro de casos:</b> El cliente se comunica con tu empresa a través de tu canal de atención preferido (teléfono,
              correo electrónico, chat, etc.). Tu equipo de atención al cliente registra los detalles del caso en Nexo, incluyendo la información del cliente, la descripción del problema y cualquier otra información
              relevante.
            </p>
            <p>
              <b>Seguimiento y gestión:</b> Una vez registrado el caso, se asigna un responsable y se establece una prioridad. El
              equipo de atención al cliente puede actualizar el estado del caso, agregar comentarios y adjuntar archivos según
              sea necesario.
            </p>
            <p>
              <b>Resolución y cierre:</b>
              Cuando el problema se resuelve, el equipo de atención al cliente cierra el caso y notifica
              al cliente.
            </p>
            <p>
              <b>Reportes y análisis:</b>
              Nexo genera reportes automáticos que te permiten analizar el
              rendimiento de tu equipo de atención al cliente, identificar tendencias y patrones, y tomar decisiones
              informadas para mejorar la calidad del servicio.
            </p>
          </div>
          <Image className={stylesG.image} height={423} width={500} src="https://i.postimg.cc/4dRYstxF/Photoroom-20250216-234456.png" />
        </section>
        <section className={stylesG.section}>
          <Image className={stylesG.image} height={343} width={490} src="https://i.postimg.cc/PJ2JWRzB/Photoroom-20250216-234532.png" />
          <div className={stylesG.text__container}>
            <h2>Beneficios</h2>
            <p><b>Experiencia y conocimiento:</b> Contamos con un equipo de expertos en atención al cliente que entienden
              las necesidades específicas de las empresas de delivery.</p>
            <p>Solución personalizada:<b></b> Nexo se adapta a tus procesos y flujos de trabajo, brindándote una solución a
              medida para tu negocio.</p>
            <p><b>Soporte y acompañamiento:</b>Te brindamos soporte técnico y capacitación para que puedas aprovechar al
              máximo todas las funcionalidades de Nexo.</p>
            <p><b>Precios competitivos:</b>Ofrecemos planes flexibles que se adaptan a tu presupuesto y a tus necesidades.
            </p>
          </div>
        </section>
        <section className={stylesG.section}>
          <div className={stylesG.text__container}>
            <h2>
              ¿Podemos ayudar a tu empresa?
            </h2>
            <p>
              En Nexo, nos enfocamos en empresas que ofrecen productos o servicios, ya sea a través de delivery, en tiendas
              físicas o en línea. Entendemos los desafíos únicos que enfrentan estas empresas y hemos diseñado nuestra
              plataforma para abordar específicamente sus necesidades.
            </p>
          </div>
          <Image className={stylesG.image} height={454} width={480} src="https://i.postimg.cc/6q9TGXRr/Photoroom-20250216-234737.png" />
        </section>
      </main>

    </div>
  );
}