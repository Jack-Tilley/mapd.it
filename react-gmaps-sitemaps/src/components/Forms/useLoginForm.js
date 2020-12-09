import { useState, useEffect } from "react";

const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      try {
        callback(values.username, values.password);
      } catch {
        console.log("error");
      }
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useLoginForm;
