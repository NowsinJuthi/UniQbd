import jwt from 'jsonwebtoken'

const SECRET_KEY = "juowjqorijrfoifyreuwfigfuguygfugureguwwhgvbiowyqoiuyruieriytjbsb"

export const generatedToken = (UserId) => {
    const token = jwt.sign({ UserId },
        SECRET_KEY,
        {
            expiresIn: '48h'
        }
    )
    return token
}

export const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    return decodedToken.UserId;
}