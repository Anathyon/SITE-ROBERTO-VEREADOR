import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button component", () => {
  it("renders children content correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies default classes and custom variants", () => {
    const { rerender } = render(<Button>Default</Button>);
    let btn = screen.getByRole("button", { name: /default/i });
    expect(btn).toHaveClass("bg-primary");

    rerender(<Button variant="destructive">Destructive</Button>);
    btn = screen.getByRole("button", { name: /destructive/i });
    expect(btn).toHaveClass("bg-destructive");
  });

  it("triggers onClick callback when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByRole("button", { name: /click/i });

    await user.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports slot rendering via asChild", () => {
    render(
      <Button asChild>
        <a href="/test-url">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-url");
    expect(link).toHaveClass("bg-primary"); // Check it retains the button classes
  });
});
