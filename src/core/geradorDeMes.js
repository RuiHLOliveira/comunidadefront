export default {
    geradorDeMes(mes, ano) {
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        // Descobre quantos dias tem o mês
        const ultimoDia = new Date(ano, mes, 0).getDate();

        const resultado = [];

        for (let dia = 1; dia <= ultimoDia; dia++) {
            const data = new Date(ano, mes - 1, dia);
            const diaSemana = data.getDay() + 1; // 1-7 (Dom-Sáb)
            const diaSemanaExtenso = diasSemana[data.getDay()];

            // Formata a data no padrão DD/MM/AAAA
            const diaFormatado = dia.toString().padStart(2, '0');
            const mesFormatado = mes.toString().padStart(2, '0');
            const extenso = `${diaFormatado}/${mesFormatado}/${ano}`;

            resultado.push({
                dia,
                diaSemana,
                diaSemanaExtenso,
                mes,
                ano,
                extenso
            });
        }

        return resultado;
    }
};