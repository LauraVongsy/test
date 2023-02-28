import { render, fireEvent, screen } from "@testing-library/react";

import Button from "../components/button.component.jsx";

test("clicking on button calls fetch with the right params", async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    render(<Button type="test" />);
    fireEvent.click(screen.getByText("Ajouter une action test"));

    expect(mockFetch).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/api`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
            actionType: "test",
        }),
    });
});
