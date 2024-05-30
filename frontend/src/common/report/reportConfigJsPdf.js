import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function createReport(orientation, formatPage) {

    const jsPDFOptions = {
        orientation: orientation ? orientation : 'p',
        unit: 'mm',
        format: formatPage ? formatPage : 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or "smart", default is 16
    }

    const dataHora = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    const doc = new jsPDF(jsPDFOptions);

    // aqui vai toda configuração dos relatórios do tipo tabela
    doc.tableObj = null;
    doc.titulo = '';
    doc.empresa = '';

    doc.margin = { top: 18, right: 5, bottom: 10, left: 5 };

    doc.headStyles = {
        halign: 'right',
        fontSize: 6,
        cellPadding: { top: 1, right: 1, bottom: 1, left: 1 },
        lineWidth: 0.1,
        fillColor: '#ccc',
        textColor: 'black',
        lineColor: 'black',
    };

    doc.bodyStyles = {
        halign: 'right',
        fontSize: 6,
        cellPadding: { top: 1, right: 1, bottom: 1, left: 1 },
        textColor: 'black',
        lineColor: 'black',
        lineWidth: 0.1,
    };

    doc.setTabelGT = (tableObj) => {
        doc.autoTable(tableObj);
    }

    doc.setHeader = () => { }// ESSA FUNCAO DEVE SER REESCRITA EM CADA RELATÓRIO PARA ADICIONAR COISAS NOVAS AO CABECALHO

    doc.setHeaderDefault = () => {
        // ESSA FUNCAO IMPRIME O CABECALHO PADRÃO, TUDO QUE MEXER AQUI VAI ALTERAR EM TODOS OS RELATÓRIOS
        // PARA ADICIONAR MAIS COISAS A UM CABECALHO É NECESSÁRIO REESCREVER A FUNCAO 
        let pageCount = doc.internal.getNumberOfPages();

        for (let i = 0; i < pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(16);
            doc.text(doc.titulo, doc.internal.pageSize.width / 2, 15, 'center');
            doc.setFontSize(12).setFont(undefined, 'bold').text(doc.empresa, doc.margin.left, 10, 'left');
            doc.setFontSize(8).setFont(undefined, 'normal').text(`Pag: ${doc.internal.getCurrentPageInfo().pageNumber} de ${pageCount}`, doc.internal.pageSize.width - doc.margin.right, 10, 'right');

            doc.setHeader();

            //footer date
            //doc.text(dataHora, doc.internal.pageSize.width - doc.margin.right, doc.internal.pageSize.height - 8, 'right');
        }
    }

    doc.printDocGT = (nameFile) => {
        doc.setDocumentProperties(
            {
                title: nameFile,
                subject: nameFile,
                author: 'GT2A Sistemas',
                creator: 'GT2A Sistemas'
            });
        if (doc.autoTable) {// se for impressão do tipo tabela
            if (Array.isArray(doc.tableObj))// é possível passar um array de tabelas ou só um objeto tabela
                for (const key in doc.tableObj) {
                    doc.tableObj[key].headStyles = doc.headStyles;
                    doc.tableObj[key].bodyStyles = doc.bodyStyles;
                    doc.tableObj[key].margin = (doc.tableObj[key].margin) ? doc.tableObj[key].margin : doc.margin;
                    doc.autoTable(doc.tableObj[key]);
                }
            else {
                doc.tableObj.headStyles = doc.headStyles;
                doc.tableObj.bodyStyles = doc.bodyStyles;
                doc.tableObj.margin = (doc.tableObj.margin) ? doc.tableObj.margin :doc.margin;
                doc.autoTable(doc.tableObj);
            }
        }

        doc.setHeaderDefault();

        // doc.output('pdfobjectnewwindow', nameFile);// não funciona com mais de uma página no chrome. No firefox funciona normal

        let teste = doc.output('bloburl', nameFile);// abre mas sem titulo ou nome
        window.open(teste, '_blank');

        // doc.save(nameFile);// salva direto
    }

    return doc;
}
