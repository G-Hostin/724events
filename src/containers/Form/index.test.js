import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const inputs = screen.getAllByTestId("field-testid"); // Recupere les inputs avec l'id des inputs dans le component Field

      fireEvent.change(
        // Simule utilisateur
        inputs.find((el) => el.name === "nom"), // .find parcours le tableau des elements (el) et trouve le bon champ dont le nam correspond à nom
        {
          target: { value: "Jean" }, // remplace la value de la target par Jean Baptiste
        }
      );
      fireEvent.change(
        inputs.find((el) => el.name === "prenom"),
        {
          target: { value: "Baptiste" },
        }
      );
      fireEvent.change(
        inputs.find((el) => el.name === "email"),
        {
          target: { value: "test@email.com" },
        }
      );
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true, // Permet apl preventDefault
          bubbles: true, // event remonte dans le DOM
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
