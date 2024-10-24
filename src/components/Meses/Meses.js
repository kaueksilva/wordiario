// components/MonthList.js

export default function MonthList() {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <div className="flex justify-center mt-4">
      {months.map((month) => (
        <span key={month} className="mx-2 text-lg text-[#003470] font-semibold">
          {month}
        </span>
      ))}
    </div>
  );
}
