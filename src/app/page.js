import Image from "next/image";

export default function Home() {
return (
<div
  className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    <section>
      <h2>¿Cómo funciona?</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos vero 
        libero, ad pariatur itaque modi est nulla
        , fugit ratione sint distinctio voluptatum nisi 
        nihil ipsam at officiis, nobis totam amet?
      </p>
    </section>
    <section>
      <div class="text">
        <h2>¿Cómo funciona?</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          At tempora numquam saepe dignissimos? Ipsa atque, minus
          laudantium facilis corporis voluptatum, omnis error dolores quidem hic
          aliquam distinctio officiis voluptas!</p>
      </div>
    </section>
    <section>
      <h2>
        Podemos ayudar a tu empresa
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        At tempora numquam saepe dignissimos? Ipsa atque, minus
        laudantium facilis corporis voluptatum, omnis error dolores quidem hic
        aliquam distinctio officiis voluptas!
      </p>
    </section>
  </main>

</div>
);
}