export interface ILoginUserRequestDTO {
    email : string,
    password : string
}

export interface ILoginUserResponseDTO {
    email : string,
    accessToken : string
}