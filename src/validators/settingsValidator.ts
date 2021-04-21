import { errorMessages } from '@config/celebrate.config';
import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    chat: Joi.boolean().required().messages(errorMessages),
    username: Joi.string().min(3).max(30).required()
      .messages(errorMessages),
  }),
});
