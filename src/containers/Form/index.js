import { useCallback, useState } from "react";
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

  const sendContact = useCallback(
    // Previent du rechargement de la fonction
    async (evt) => {
      evt.preventDefault();
      setSending(true); // Envoi en cours
      // We try to call mockContactApi
      try {
        await mockContactApi(); // Essaye de joindre la fausse API
        setSending(false); // Plus en cours d'envoi
        onSuccess(); // Affiche le message de succès
      } catch (err) {
        setSending(false); // Si erreur plus en cours d'envoi non plus
        onError(err); // Erreur
      }
    },
    [onSuccess, onError] // Dependances de useCallback, recharge la fonction quand une des deux change
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
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
