import * as BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";

const extension: BaseJoi.ExtensionFactory = joi => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const tagValidationSchema = Joi.object({
  tag: Joi.object({
    name: Joi.string().required().escapeHTML(),
  }).required(),
});
