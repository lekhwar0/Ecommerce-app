import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@material-tailwind/react";

import { useSearchContext } from "../../context/SearchContextProvider";
import { appConfig } from "../../config/appConfig";

const SearchInput = () => {
  const { values, setValues } = useSearchContext();
  const navigate = useNavigate();

  const handleFormOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/search-product/${values?.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="flex items-center justify-center"
        role="search"
        onSubmit={handleFormOnSubmit}
      >
        <Input
          type="text"
          size="lg"
          label="Search Product"
          color="yellow"
          name="values"
          className="flex-1 text-white rounded-r-none"
          value={values?.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          autoComplete="true"
          labelProps={{ className: "text-white" }}
        />

        <Button
          className="bg-appThemeDarkBlue inline-flex items-center justify-center gap-2 hover:text-appThemeDarkBlue hover:bg-appThemeYellow rounded-l-none border border-l-0 border-white"
          type="submit"
        >
          <AiOutlineSearch size={20} />
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;
