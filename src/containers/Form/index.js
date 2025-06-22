import { useCallback, useState, useRef } from "react"; // Import useRef pour stocker le form
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  }); // Simulation de fausse API a 0.5s avant reponse

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false); // Affiche btn En cours d'envoi
  const formRef = useRef(null); // Créé un "boite vide" qui contiendra le form

  const sendContact = useCallback(
    // Previent du re render de la fonction au cas ou
    async (evt) => {
      evt.preventDefault(); // empeche rechargement submit

      const formData = new FormData(evt.target); // Methode native navigateur pour stocker un form et ses données
      const nom = formData.get("nom")?.trim(); // Recupere le name nom et supprimes les espaces etc
      const prenom = formData.get("prenom")?.trim();
      const email = formData.get("email")?.trim();

      if (!nom || !prenom || !email) {
        // Si il manque le nom OU le prenom OU l'email
        onError(new Error("Nom, prénom et email requis")); // Error native JS avec le message d'erreur
        return;
      }

      setSending(true); // Envoi en cours
      // We try to call mockContactApi
      try {
        await mockContactApi(); // Essaye de joindre la fausse API
        setSending(false); // Plus en cours d'envoi
        formRef.current.reset(); // Vide le form, .reset est une methode native HTML
        onSuccess(); // Affiche le message de succès
      } catch (err) {
        setSending(false); // Si erreur plus en cours d'envoi non plus
        onError(err); // Erreur
      }
    },
    [onSuccess, onError] // Dependances de useCallback, recharge la fonction quand une des deux change
  );
  return (
    <form onSubmit={sendContact} ref={formRef}>
      {/* Lie l'element form à formRef.current --> le stocke */}
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="nom" />
          <Field placeholder="" label="Prénom" name="prenom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" name="email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
