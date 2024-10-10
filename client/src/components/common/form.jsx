import { Button } from "../ui/button";
import { Label } from "../ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isDisable,
}) {
  function renderInputByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    const inputField = () => (
      <Input
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.name}
        type={getControlItem.type}
        value={value}
        onChange={(event) =>
          setFormData({
            ...formData,
            [getControlItem.name]: event.target.value,
          })
        }
      />
    );

    const selectField = () => {
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={getControlItem.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {getControlItem.options?.map((optionItem) => (
              <SelectItem value={optionItem.id} key={optionItem.id}>
                {optionItem.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    };
    

    const textareaField = () => (
      <Textarea
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.id}
        value={value}
        onChange={(event) =>
          setFormData({
            ...formData,
            [getControlItem.name]: event.target.value,
          })
        }
      />
    );

    const components = {
      input: inputField,
      select: selectField,
      textarea: textareaField,
    };

    return components[getControlItem.componentType]
      ? components[getControlItem.componentType]()
      : inputField();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isDisable} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
