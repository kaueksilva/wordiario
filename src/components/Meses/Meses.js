import { getpostsPerMonth } from '../../data/yearlyPosts';

// components/MonthList.js

export default function MonthList() {
  const months = [
    { nome: 'Janeiro', numero: 1 },
    { nome: 'Fevereiro', numero: 2 },
    { nome: 'Março', numero: 3 },
    { nome: 'Abril', numero: 4 },
    { nome: 'Maio', numero: 5 },
    { nome: 'Junho', numero: 6 },
    { nome: 'Julho', numero: 7 },
    { nome: 'Agosto', numero: 8 },
    { nome: 'Setembro', numero: 9 },
    { nome: 'Outubro', numero: 10 },
    { nome: 'Bovembro', numero: 11 },
    { nome: 'Dezembro', numero: 12 },
  ];

  async function postsFiltradosPorMes(
    before = { year: 2024, month: 3, day: 1 },
    after = { year: 2024, month: 1, day: 31 }
  ) {
    try {
      const posts = await getpostsPerMonth(before, after);
      console.log('PASSEI NA FUNÇÃO postsFiltradosPorMes');
      let { data } = posts;
      console.log(data);
      return posts;
    } catch (e) {
      console.log(`ERRO NA FUNÇÃO postsFiltradosPorMes. ERRO: ${e}`);
      return e;
    }
  }

  return (
    <div className="flex justify-center mt-4">
      {months.map((month) => (
        <a
          key={month.numero}
          className="mx-2 text-lg text-[#003470] font-semibold"
          onClick={() => {
            console.log(postsFiltradosPorMes());
          }}
        >
          {month.nome}
        </a>
      ))}
    </div>
  );
}
