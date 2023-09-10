import * as Joi from 'joi';

export default () => {
  const { value: config, error } = Joi.object({
    BREVO_API_KEY: Joi.string().required(),
  })
    .unknown(true)
    .validate(process.env);

  if (error) throw error;

  return config;
};
