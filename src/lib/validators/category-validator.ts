import { z } from "zod"

export const CATEGORY_NAME_VALIDATOR=z.string().min(3, "Category name is required.").regex(
    /^[a-zA-Z0-9-]+$/ , "Category name can only contain letters , numbers and hypens."
)