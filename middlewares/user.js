import Joi from 'joi';

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().optional(),
  bio: Joi.string().optional(),
  occupation: Joi.string().optional(),
  expertise: Joi.string().optional(),
  isAdmin: Joi.boolean().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const createSessionSchema = Joi.object({
    mentorId: Joi.number().integer().required().min(1),
    questions: Joi.string().trim().required(),

})

export const signupMiddleware = async (req, res, next) => {
    try {
        req.body = await signupSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 400, error: error.details[0].message });
    }
  };

export const loginMiddleware = async (req, res, next) => {
    try {
        req.body = await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 400, error: error.details[0].message });
    }
}

export const sessionMiddleware = async (req, res, next) => {
    try {
        req.body = await createSessionSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ status: 400, error: error.details[0].message });
    }
  };



  

  