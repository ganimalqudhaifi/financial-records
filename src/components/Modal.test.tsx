import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  const renderComponent = (isOpen: boolean) => {
    if (!isOpen) return null;

    return render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );
  };

  it("calls onClose when the close button is clicked", () => {
    renderComponent(true);

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
