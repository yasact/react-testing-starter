import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    return {
      trigger: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) => screen.findByRole("option", { name: label }),
      user: userEvent.setup(),
      onChange,
    };
  };
  it("should render New as default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });
  it("should render correct statuses", async () => {
    const { trigger, getOptions, user } = renderComponent();
    await user.click(trigger);

    const options = await getOptions();
    expect(options).toHaveLength(3);
    const label = options.map((option) => option.textContent);
    expect(label).toEqual(["New", "Processed", "Fulfilled"]);
    console.log(options[0].textContent);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onChange with $value when the $label option is selected",
    async ({ label, value }) => {
      const { trigger, user, onChange, getOption } = renderComponent();
      await user.click(trigger);
      // const option = await screen.findByRole("option", { name: label });
      const option = await getOption(label);
      await user.click(option);
      console.log("option", option.textContent);

      expect(option).toHaveTextContent(label);
      expect(onChange).toHaveBeenCalledWith(value);
    }
  );
  it("should call onChange with 'new' when the New option is selected", async () => {
    const { trigger, user, onChange, getOption } = renderComponent();
    await user.click(trigger);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(trigger);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
