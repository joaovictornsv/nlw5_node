import { errorMessages } from '@config/celebrate.config';
import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages(errorMessages),
  }),
});
