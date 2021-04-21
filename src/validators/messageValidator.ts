import { errorMessages } from '@config/celebrate.config';
import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    admin_id: Joi.string().uuid().messages(errorMessages),
    user_id: Joi.string().uuid().required().messages(errorMessages),
    text: Joi.string().required().messages(errorMessages),
  }),
});
