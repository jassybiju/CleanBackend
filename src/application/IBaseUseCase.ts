export interface IBaseUseCase<input, output>{
    execute(input : input) : Promise<output>
}