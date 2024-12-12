import Joi from "joi";
import { CartUpdateDTO } from "../types/CartUpdateDTO";

const productUpdateSchema = Joi.object<CartUpdateDTO>({
    productId: Joi.string().uuid().required(),
    count: Joi.number().min(0).required(),
});

export function validateCartUpdate(cartUpdateDTO: unknown): Joi.ValidationResult<CartUpdateDTO> {
    return productUpdateSchema.validate(cartUpdateDTO);
}