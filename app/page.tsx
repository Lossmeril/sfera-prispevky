"use client";

// app/generators/page.tsx (or wherever this page lives)
import React from "react";

import {
  generatablePosters,
  generatablePosts,
  generatableScreens,
  generatableWebThumbs,
} from "@/datasets/generatableImages";

import GeneratorGrid from "@/components/homeGrid";
import { Modal } from "@/components/modal";

const GeneratorsHomePage = () => {
  const [modalOpen, setModalOpen] = React.useState(true);

  return (
    <div className="w-screen h-auto mt-8 flex flex-col justify-center px-[10%]">
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Vítejte v nové verzi generátoru!"
      >
        <p>Ahoj! Vítejte v nové, přepracované verzi generátoru!</p>
        <p className="">
          Nová verze disponuje větší nabídkou prvků, lepším uživatelským
          rozhraním a větší nabídkou obrázků ke generování.
        </p>
        <p className="">
          Jelikož je tato verze stále ve vývoji, můžete narazit na různé chyby,
          které budeme průběžně opravovat.
        </p>
        <p className="w-full bg-red-200 p-3 mb-4">
          Pro jistotu úplné funkčnosti generátoru doporučujeme mít
          nainstalovanou celou sadu sférických fontů.
        </p>
      </Modal>
      <h1 className="above-heading mt-10 mb-14 text-xl md:text-2xl xl:text-3xl">
        Generátor sférických příspěvků 2.0
      </h1>

      <GeneratorGrid title="Příspěvky" items={generatablePosts} />
      <GeneratorGrid title="Digitální obrazovky" items={generatableScreens} />
      <GeneratorGrid title="Plakáty" items={generatablePosters} />
      <GeneratorGrid title="Webové náhleďáky" items={generatableWebThumbs} />
    </div>
  );
};

export default GeneratorsHomePage;
