interface BaseCreateUserDTO {
    name  :string,
    email : string
}

export interface ICreateUserRequestDTO extends BaseCreateUserDTO{
    password : string
}

export interface ICreateUserResponseDTO extends BaseCreateUserDTO {
    id : string
}