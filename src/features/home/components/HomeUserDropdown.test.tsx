import { fireEvent, render, screen } from "@testing-library/react";
import HomeUserDropdown from "./HomeUserDropdown";

const mockHandleUserDropdown = jest.fn();
const mockHandleSignOut = jest.fn();

const mockUser = {
  photoURL: "https://via.placeholder.com/200",
  displayName: "John Doe",
  email: "john.doe@example.com",
};

describe("HomeUserDropdown", () => {
  it("redirect to login and register when user is not logged in", () => {
    render(
      <HomeUserDropdown
        user={null}
        handleSignOut={mockHandleSignOut}
        handleUserDropdown={mockHandleUserDropdown}
        isUserDropdownOpen={false}
      />,
    );

    const loginLink = screen.getByText(/login/i);
    const registerLink = screen.getByText(/register/i);

    expect(loginLink).toHaveAttribute("href", "/login");
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("render user dropdown menu and redirects correctly when links are clicked", () => {
    render(
      <HomeUserDropdown
        user={mockUser}
        handleSignOut={mockHandleSignOut}
        handleUserDropdown={mockHandleUserDropdown}
        isUserDropdownOpen={true}
      />,
    );

    const dashboardLink = screen.getByText(/dashboard/i);
    const tableLink = screen.getByText(/table/i);
    const profileLink = screen.getByText(/profile/i);

    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    expect(tableLink).toHaveAttribute("href", "/records");
    expect(profileLink).toHaveAttribute("href", "/profile");
  });

  it("calls handleSignOut when sign out button is clicked", () => {
    render(
      <HomeUserDropdown
        user={mockUser}
        handleSignOut={mockHandleSignOut}
        handleUserDropdown={mockHandleUserDropdown}
        isUserDropdownOpen={true}
      />,
    );

    const signOutButton = screen.getByText(/sign out/i);
    fireEvent.click(signOutButton);
    expect(mockHandleSignOut).toHaveBeenCalledTimes(1);
  });
});
