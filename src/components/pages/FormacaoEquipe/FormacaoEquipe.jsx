import Navbar from '../../Navbar';
import style from './FormacaoEquipe.module.css';

const FormacaoEquipe = () => {

    return (
        <div className={style.bodyFormacaoEquipe}>
            <Navbar />
            <div className={style.container}>
                <h1>Formação de Equipe</h1>
                <h2>Que característica você deseja na sua equipe?</h2>
                <form id="formularioFormacaoEquipe" className={style.form}>
                    <label className={style.label}>Tamanho ideal da equipe</label>
                    <select id="tamanhoEquipe" className={style.select}>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                    </select>
                    <label className={style.label}>Área de interesse</label>
                    <select id="areaInteresse" className={style.select}>
                        <option value="engenharia">Engenharia</option>
                        <option value="arquitetura">Arquitetura</option>
                        <option value="educacao">Educação</option>
                        <option value="marketing">Marketing</option>
                        <option value="finanças">Finanças</option>
                        <option value="jornalismo">Jornalismo</option>
                        <option value="designGrafico">Design Gráfico</option>
                        <option value="turismo">Turismo</option>
                    </select>
                    <label className={style.label}>Habilidade desejada</label>
                    <select id="habilidadeDesejada" className={style.select}>
                        <option value="excel">Excel</option>
                        <option value="figma">Figma</option>
                        <option value="powerBI">Power BI</option>
                        <option value="trafegoPago">Tráfego Pago</option>
                    </select>
                    <label className={style.label}>Campus</label>
                    <select id="campus" className={style.select}>
                        <option value="asaNorte">Asa Norte</option>
                        <option value="taguatinga">Taguatinga</option>
                    </select>
                    <div className={style.divBotao}>
                    <input type="submit" value="Submeter" className={style.submit}></input>
                    <input type="reset" value="Resetar" className={style.reset}></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormacaoEquipe;