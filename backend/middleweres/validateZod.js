import { object } from "zod";


export const validateZod = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log("result ", result);
  if (!result.success) {
    const formatted = result.error.format();
    console.log("formtted ", formatted);
    
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors:Object.keys(formatted).map(fields=>({
        fields,
        message: formatted[fields]?._errors?.[0] || 'Invalid input'
      }))
      
    });
  }
  next();
};
