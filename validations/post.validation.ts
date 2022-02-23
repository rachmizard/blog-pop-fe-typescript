import * as Yup from "yup";

export const PostSchemaValidation = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),
  published: Yup.boolean()
    .required("Published should be yes/no")
    .default(false),
});
