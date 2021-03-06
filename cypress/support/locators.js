const loctors = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn',
        APP_RESET: '[href="/reset"]'
    }, 
    MENSAGE: '#toast-container',

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        SAIR: '[href="/logout"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR_CONTA: '.btn',
        FN_XP_BTN_EDITAR_CONTA: nome =>`//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`,
        FN_XP_BTN_EXCLUIR_CONTA:nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-trash-alt']`
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        BTN_SALVAR_MOVIMENTACAO: '.btn-primary',
        CONTAS: '[data-test=conta]'
    },

    EXTRATO: {
        FN_XP_BUSCA_ELEMENTO: (elemento,valor) => `//span[contains(.,'${elemento}')]/following-sibling::small[contains(.,'${valor}')]`,
        FN_XP_BTN_EXCLUIR_MOVIMENTACAO: nomeConta => `//span[contains(., '${nomeConta}')]/../../..//i[@class="far fa-trash-alt"]`
    },

    SALDO: {
        FN_XP_SALDO: conta => `//td[contains(., "${conta}")]/../td[2]`
    }
}

export default loctors