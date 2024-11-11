// Home.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock, describe, beforeEach, it, expect } from "vitest";
import { Home } from "../pages/Home";
import { useAuth } from "../hooks/useAuth";

// Mock de useAuth
vi.mock("../hooks/useAuth");

describe("Home Component", () => {
  const mockLogout = vi.fn();
  const mockToken = "fake-token";

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as unknown as Mock).mockReturnValue({
      token: mockToken,
      logout: mockLogout,
    });
  });

  it("debería renderizar el formulario de carga cuando no hay respuesta", () => {
    render(<Home />);
    expect(screen.getByText("Data Loading System"));
    expect(screen.getByLabelText("Seleccionar archivo"));
  });

  it("debería llamar a logout cuando se hace clic en el botón 'Logout'", () => {
    render(<Home />);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it("debería mostrar el indicador de carga durante la subida", async () => {
    // Mock de fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: { successCount: 1, failedCount: 0 },
            message: "",
          }),
      })
    ) as Mock;

    render(<Home />);

    const file = new File(["contenido del archivo"], "test.csv", {
      type: "text/csv",
    });

    // Simular la carga de archivo
    const input = screen.getByLabelText("Seleccionar archivo");
    fireEvent.change(input, { target: { files: [file] } });

    // Simular el envío del formulario
    const submitButton = screen.getByText("Cargar");
    fireEvent.click(submitButton);

    // Verificar que se muestra el indicador de carga
    expect(screen.getByText("Loading..."));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Limpieza del mock de fetch
    (global.fetch as Mock).mockRestore();
  });
});
