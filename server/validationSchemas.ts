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

export const tagValidationSchema = Joi.object({
  tag: Joi.object({
    name: Joi.string().required().escapeHTML(),
  }).required(),
});

export const meetupValidationSchema = Joi.object({
  meetup: Joi.object({
    title: Joi.string().required().escapeHTML(),
    group: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    happeningOn: Joi.date().required(),
    location: Joi.string().required().escapeHTML(),
    isOnline: Joi.boolean().falsy(),
    tags: Joi.array().items(Joi.string().escapeHTML()),
  }).required(),
});

export const groupValidationSchema = Joi.object({
  group: Joi.object({
    title: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    isPrivate: Joi.boolean().falsy(),
    tags: Joi.array().items(Joi.string().escapeHTML()),
  }).required(),
});

export const userValidationSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required().escapeHTML(),
    displayName: Joi.string().escapeHTML(),
    password: Joi.string().required().escapeHTML(),
  }).required(),
});
