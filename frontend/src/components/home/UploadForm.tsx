import React from "react";
import Form from "../Form";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadForm = (props: Props) => {
  const { handleSubmit, handleChange } = props;
  return (
    <div className="max-w-md mx-auto">
      <Form onSubmit={handleSubmit}>
        <Form.InputFile
          id="file"
          name="file"
          label="Upload a File"
          onChange={handleChange}
        />
        <Form.Button>Upload</Form.Button>
      </Form>
    </div>
  );
};

export default UploadForm;
