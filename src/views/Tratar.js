export class Tratar{
    static ERRO(numErr){
        if(numErr == -10)
            console.log("\nERRO: CPF invalido.\n")
        if(numErr == -11)
            console.log("\nERRO: CPF já cadastrado.\n")
        if(numErr == -12)
            console.log("\nERRO: Nome invalido.\n")
        if(numErr == -13)
            console.log("\nERRO: Data invalida.\n")
        if(numErr == -14)
            console.log("\nERRO: Idade menor que 13 anos\n")
        if(numErr == -15)
            console.log("\nERRO: Paciente não cadastrado\n")
        if(numErr == -16)
            console.log("\nERRO: Paciente ja possui um agendamento\n")
        if(numErr == -17)
            console.log("\nERRO: Hora Invalida\n")
        if(numErr == -18)
            console.log("\nERRO: Horario fora do periodo de funcionamento\n")
        if(numErr == -19)
            console.log("\nERRO: Já existe uma consulta agendada nesse horário\n")
        if(numErr == -20)
            console.log("\nERRO: Consulta nao agendada\n")
        if(numErr == -21)
            console.log("\nERRO: Agendamento não encontrado\n")
        if(numErr == -22)
            console.log("\nERRO: Agendamento não é futuro\n")
        if(numErr == -23)
            console.log("\nERRO: Este paciente possui um agendamento futuro")
    }   
}