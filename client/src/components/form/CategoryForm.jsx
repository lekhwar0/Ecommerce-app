import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { IoMdAddCircle } from "react-icons/io";

const CategoryForm = ({ handleFormOnSubmit, value, setValue }) => {
  return (
    <div>
      <form
        className="w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleFormOnSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            type="text"
            size="md"
            label="Create new category"
            color="blue"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="true"
          />
        </div>

        <Button
          className="bg-appThemeDarkBlue inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
          fullWidth
          type="submit"
        >
          Create category <IoMdAddCircle size={20} />
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
