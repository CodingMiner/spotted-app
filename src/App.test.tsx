import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App";

describe("App", () => {
  it("renders WelcomePage on root route", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
  });
});
