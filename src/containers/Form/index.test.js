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

      const inputs = screen.getAllByTestId("field-testid");

      fireEvent.change(
        inputs.find((el) => el.name === "nom"),
        {
          target: { value: "Jean" },
        }
      );
      fireEvent.change(
        inputs.find((el) => el.name === "prenom"),
        {
          target: { value: "Dupont" },
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
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
