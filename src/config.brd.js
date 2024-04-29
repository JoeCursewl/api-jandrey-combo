import * as argon2 from "argon2";

export const error_messgae_500 = "An error has occured while processing this request"

export const error_messgae_401 = "Invalid credentials. Unauthorized"

export const error_messgae_400 = "Credentials already registered. Bad request"

export const hashingPassword = async (password) => {
    const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2d,
        memoryCost: 2 ** 16,
        hashLength: 50,
    })

    return { hPassword: hashedPassword }
}

export const date = new Date();



