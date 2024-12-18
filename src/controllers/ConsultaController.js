import { ConsultaService } from "../service/ConsultaService.js";
import { ValidarInput } from "../validators/validarInput.js";
import { Tela_AgendamentoConsulta } from "../views/Tela_AgendamentoConsulta.js";
import { Tela_MostrarAgendamento } from "../views/Tela_MostrarAgendamento.js";
import { Tratar } from "../views/Tratar.js";

/**
* Controller responsável pelo gerenciamento de consultas no sistema.
* Contém métodos para cadastrar, listar e cancelar agendamentos de consultas.
*/

export class ConsultaController{

    /**
    * Realiza o cadastro de uma nova consulta no sistema.
    * 
    * Verifica se o paciente existe, se não há agendamento anterior, se os dados fornecidos são válidos
    * (data, hora), e se o agendamento não está sobrepondo outros já existentes.
    *
    * @param {Object} consultorio - Objeto representando o consultório onde as consultas serão agendadas.
    * @returns {boolean} Retorna `true` se o agendamento for realizado com sucesso, 
    * caso contrário retorna um código de erro.
    */
    
    static cadastrarConsulta(consultorio){
        console.clear()
        const CPF = Tela_AgendamentoConsulta.inputCpf()

        if(!consultorio.pacienteExiste(CPF)){
            return Tratar.ERRO(-15)
        }

        if(!consultorio.validarAgendamentoUnico(CPF)){
            return Tratar.ERRO(-16)
        }

        const data = Tela_AgendamentoConsulta.inputData()

        if(!ValidarInput.estruturaData(data)){
            return Tratar.ERRO(-13)
        }

        const horaIni = Tela_AgendamentoConsulta.inputHoraIni()

        if(!ValidarInput.validarHora(horaIni)){
            return Tratar.ERRO(-17)
        }

        if(!ValidarInput. validarPeriodoFuturo(data, horaIni)){
            return Tratar.ERRO(-17)
        }

        const horaFim = Tela_AgendamentoConsulta.inputHoraFim()

        if(!ValidarInput.validarHora(horaFim)){
            return Tratar.ERRO(-17)
        }

        if(!ValidarInput.validarHoraInicialFinal(horaIni, horaFim)){
            return Tratar.ERRO(-17)
        }

        if(!ConsultaService.horaDentroDoHorario(horaIni, horaFim)){
            return Tratar.ERRO(-18)
        }
        
        if(!consultorio.validarSobreposicaoConsulta(data, horaIni, horaFim)){
            return Tratar.ERRO(-19)
        }

        const paciente = consultorio.buscarPaciente(CPF);

        var consulta = ConsultaService.agendarConsulta(paciente, data, horaIni, horaFim);

        if(!consulta){
            return  Tratar.ERRO(-20);
        }


        const res = consultorio.agendarConsulta(consulta);

        return res;
    }

    /**
    * Realiza a listagem de todos os agendamentos ou de agendamentos dentro de um período específico.
    * 
    * @param {Object} consultorio - Objeto representando o consultório de onde serão listados os agendamentos.
    * @returns {Array} Retorna um array contendo os agendamentos encontrados e as datas inicial e final do período, 
    * caso o usuário tenha especificado um período.
    */

    static listarAgendamento(consultorio){
        const [res, dataIni, dataFim] = Tela_MostrarAgendamento.ApresentarAgenda()

        const agendamentos = consultorio.listarAgenda(res, dataIni, dataFim)

        return [agendamentos, dataIni, dataFim]
    }

    /**
    * Realiza o cancelamento de um agendamento de consulta.
    * 
    * Verifica se o paciente existe, se os dados da consulta são válidos e se o agendamento é futuro.
    * 
    * @param {Object} consultorio - Objeto representando o consultório onde o agendamento será cancelado.
    * @returns {boolean} Retorna `true` se o cancelamento for realizado com sucesso, 
    * caso contrário retorna um código de erro.
    */

    static cancelarAgendamento(consultorio){
        console.clear()
        const CPF = Tela_AgendamentoConsulta.inputCpf()

        if(!consultorio.pacienteExiste(CPF)){
            return Tratar.ERRO(-15)
        }

        const data = Tela_AgendamentoConsulta.inputData()

        if(!ValidarInput.estruturaData(data)){
            return Tratar.ERRO(-13)
        }

        const horaIni = Tela_AgendamentoConsulta.inputHoraIni()

        if(!ValidarInput.validarHora(horaIni)){
            return Tratar.ERRO(-17)
        }

        if(!ValidarInput. validarPeriodoFuturo(data, horaIni)){
            return Tratar.ERRO(-17)
        }

        const res = consultorio.cancelarAgendamento(CPF, data, horaIni)

        if(res == -1){
            return Tratar.ERRO(-21)
        }

        if(res == -1){
            return Tratar.ERRO(-22)
        }

        return res;
    }
}