import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn helper", () => {
  it("should merge string classes correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const result = cn("class1", true && "class2", false && "class3");
    expect(result).toBe("class1 class2");
  });

  it("should resolve Tailwind conflicts correctly", () => {
    // twMerge should prioritize the later padding class
    const result = cn("px-2 px-4");
    expect(result).toBe("px-4");
  });

  it("should ignore falsy values", () => {
    const result = cn("class1", null, undefined, "", "class2");
    expect(result).toBe("class1 class2");
  });
});
