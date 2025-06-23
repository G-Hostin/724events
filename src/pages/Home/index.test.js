import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);

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
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventsList = await screen.findByTestId("events-list-testid");
    expect(eventsList).toBeInTheDocument();
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    const peopleList = await screen.findByTestId("people-list-testid");
    expect(peopleList).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    // to implement
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  });
});
