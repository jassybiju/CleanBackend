interface ICreatePostDTO {
  authorId: string;
  title: string;
  content: string;
}

export interface ICreatePostRequestDTO extends ICreatePostDTO {}

export interface ICreatePostResponseDTO extends ICreatePostDTO {
  id: string;
}
