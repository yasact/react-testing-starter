import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

// user nameが表示されているか
// adminのときにEditボタンが表示されているか
// adminじゃない時にEditボタンが表示されていないか
describe("UserAccount", () => {
  it("should render user name", () => {
    render(<UserAccount user={{ id: 1, name: "Mosh", isAdmin: false }} />);
    const name = screen.getByText(/mosh/i);
    expect(name).toBeInTheDocument();
  });
  it('should render "Edit" button when user is admin', () => {
    render(<UserAccount user={{ id: 1, name: "Mosh", isAdmin: true }} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/edit/i);
    expect(button).toBeInTheDocument();
  });
  it('should not render "Edit" button when user is not admin', () => {
    render(<UserAccount user={{ id: 1, name: "Mosh", isAdmin: false }} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
