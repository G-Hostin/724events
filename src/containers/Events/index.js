import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Affiche 9 items par page

const EventList = () => {
  const { data, error } = useData(); // json + erreur
  const [type, setType] = useState(); // type = categorie
  const [currentPage, setCurrentPage] = useState(1); // gere les pages
  // const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(      data?.events ne sert a rien
  //   (event, index) => {
  //     if (       affiche les index compris entre (currentPage - 1) * PER_PAGE et PER_PAGE * currentPage
  //       (currentPage - 1) * PER_PAGE <= index &&
  //       PER_PAGE * currentPage > index
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  // );
  const filteredByType = (data?.events || []).filter(
    (event) => (type ? event.type === type : true) // garde uniquement les event dont le type correspond au type selectionne et si type est null/undefined alors true et tout est gardé
  );

  const filteredEvents = filteredByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  ); // .slice(start, end) extrait un bout du tableau sans le modifier

  const changeType = (evtType) => {
    // Appel quand categorie est changée dans Select
    setCurrentPage(1); // Reviens sur la page 1 (sinon possibilite de page vide et mieux pour UX)
    setType(evtType); // Mets la categorie selectionee dans useState type
  };
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // Math.floor (plancher) arrondi vers le bas alors que Math.ceil (plafond) arrondi vers le haut + FILTEREDEVENTS contient les éléments affichés sur la page actuelle donc c'est tout le temps 1
  const pageNumber = Math.ceil(filteredByType.length / PER_PAGE); // Le nombre d'éléments du type séléctionné (et pas seulement ceux a afficher) arrondis au dessus
  const typeList = new Set(data?.events.map((event) => event.type)); // Créé la liste des types d'events en prenant le type de chaque event et Set supprime les doublons
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} // Transforme la typeList en tableau pour faire un .map dessus
            onChange={(value) => (value ? changeType(value) : changeType(null))} // Si value existe (exemple conférence) alors on apl changeType sinon c'est null donc desactive le filtrage (toutes)
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
