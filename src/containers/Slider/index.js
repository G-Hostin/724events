import { React, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ); // focus = zone du json avec les events qu'on souhaite mettre en avant et donc si data existe, prends les éléments focus et trie du plus ancien au plus récent (a < b = décroissant)

  // const nextCard = () => {
  //   setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
  // };
  // useEffect(() => {
  //   nextCard();
  // });

  const nextCard = () => {
    setIndex((prev) => (prev < byDateDesc.length - 1 ? prev + 1 : 0));
  }; // Pas de setTimeout à chaque appel de la fonction, prev empeche les bugs si state mis à jour ailleur, et surtout byDateDesc.length - 1 car décalage entre index et lenght
  const slideCount = byDateDesc?.length; // Pas d'erreur de undefined sur le useEffect

  useEffect(() => {
    // useEffect qui se déclenche à chaque changement d'index ou du nombre de photos
    const timer = setTimeout(() => {
      nextCard();
    }, 5000); // Appel nextCard toutes les 5s
    return () => clearTimeout(timer); // evite les superpositions de timer
  }, [index, slideCount]);

  return (
    <div className="SlideCardList">
      {/* .map sur la liste des events, idx est l'index du map */}
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={event.title}>
          {" "}
          {/* Ajout d'une key au fragment car dans un .map */}
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* className qui affiche ou pas la div en fonction de si l'index du map correspond à celui du useState */}
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}{" "}
              {/* Pour chaque image on crée un btn radio et celui dont l'index radioIdx correspond à celui du useState est checked */}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
