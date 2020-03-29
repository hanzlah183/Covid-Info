import React from "react";

//ant design
import { Form, Input } from "antd";

const Search = ({ onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Form.Item>
        <Input
          size="small"
          placeholder="enter country name"
          onChange={onChange}
        />
      </Form.Item>
    </form>
  );
};

export default Search;
