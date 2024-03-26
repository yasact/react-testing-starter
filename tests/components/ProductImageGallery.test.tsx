// render with empty array
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render no images available message when images is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("should render a list of images", () => {
    const imageUrls = ["url1", "url2", "url3"];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrls.length);
  });
});
