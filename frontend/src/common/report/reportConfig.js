import { format } from 'date-fns';

export function reportConfig(){


    // export let report = {
    let report = {

        // Gerando relatório em modo retrato(padrão)
        pageOrientation: 'portrait', // landscape -> paisagem (não deve ser alterado aqui, tem que ser no Action de cada relatório)

        // '4A0', '2A0', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
        // 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
        // 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
        // 'RA0', 'RA1', 'RA2', 'RA3', 'RA4',
        // 'SRA0', 'SRA1', 'SRA2', 'SRA3', 'SRA4',
        // 'EXECUTIVE', 'FOLIO', 'LEGAL', 'LETTER','TABLOID'
        pageSize: 'A4', // (não deve ser alterado aqui, tem que ser no Action de cada relatório)
        // pageSize: { width: 595.28, height: 842 } // assim também funciona(esse é o tamanho de uma A4 em px), é possível personalizar o tamanho (é em pixel -> cm*72).

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [20, 50, 20, 20],// padrão (deve ser alterado no Action se necessário)

        info: {// informações do pdf
            title: '', //o título do documento
            author: 'GT2A', //o nome do autor'
            // subject     : '', //o assunto do documento
            // keywords    : '', // palavras-chave associadas ao documento
            creator: 'GT2A', // o criador do documento (o padrão é 'pdfmake')
            producer: 'GT2A', // o produtor do documento (o padrão é 'pdfmake')
            // creationDate: '', // a data em que o documento foi criado (adicionado automaticamente por pdfmake)
            // modDate     : '', // a data em que o documento foi modificado pela última vez
            // trapped     : '', // o sinalizador de trapping em um documento PDF indica se o documento foi “trapping”, ou seja, corrigido para pequenos erros de registro de cores
        },

        header: {},

        footer: {
            columns: [
                { text: format(new Date(), 'dd/MM/yyyy HH:mm:ss'), alignment: 'right' }
            ],
            fontSize: 6,
            margin: [20, 0]
        },

        content: [],// conteúdo do pdf

        styles: {
            header: {
                fontSize: 6,
                // bold: true,
                // alignment: 'left',
            },

            details: {
                fontSize: 6
            }
        },

        setHeader(headerData) {
            this.header = (currentPage, pageCount, pageSize) => {
                return [
                    {
                        margin: [20, 20, 20, 0],
                        columns: [
                            { text: headerData.empresa },
                            { text: `Pág: ${currentPage.toString()} de ${pageCount}`, alignment: 'right' }
                        ],
                        fontSize: 8
                    },
                    {
                        margin: [20, 0, 20, 0],
                        text: headerData.titulo, alignment: 'center'
                        // fontSize: 8
                    }
                ]
            }
        }
    }

    return report;
}

export default reportConfig;