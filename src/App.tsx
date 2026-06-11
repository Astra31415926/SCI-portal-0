import React, { useState } from 'react';

// Данные галереи с твоими реальными генераторами
const projects = [
  {
    id: 'light-art',
    title: 'Світлочутлива Живопис',
    category: 'Арт-напрямок',
    description: 'Синергія фізики світла та класичного полотна. Поєднання трьох художніх шарів (RGB-каналів), які кардинально змінюють свій зміст та візуальне сприйняття залежно від спектра та температури зовнішнього освітлення.',
    image: 'steganography_acrylic_canvas.jpg',
    link: null
  },
  {
    id: 'qr-multi',
    title: 'Багатошарові QR-коди (QR.G.B.-ART)',
    category: 'Стеганографія',
    description: 'Технологія прихованого кодування даних. Три незалежні чорно-білі QR-коди інтегруються в один кольоровий масив по RGB-каналах. Зчитування конкретного блоку інформації залежно від фільтрації світлового спектра.',
    image: 'main_sci_rss_blueprint.png',
    link: 'https://astra31415926.github.io/QR.G.B.-ART/'
  },
  {
    id: 'qr-ornament',
    title: 'Орнаментальні коди (QRnament)',
    category: 'Стеганографія',
    description: 'Естетичне маскування даних. Робочий кодуючий шар повністю зміщений у синій спектр, що робить його практично невидимим для людського ока. Два інших канали (Red та Green) повністю віддані під сакральну геометрію, орнаменти та мандали.',
    image: 'main_sci_rss_blueprint.png',
    link: 'https://astra31415926.github.io/QRnament2/'
  }
];

export default function App() {
  const [crosstalk, setCrosstalk] = useState(40);
  const [absorption, setAbsorption] = useState(30);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* МАНІФЕСТ / ШАПКА */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-bl-full rounded-tr-full bg-gradient-to-tr from-cyan-500 to-indigo-500 animate-pulse" />
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">SCI PORTAL</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#manifesto" className="hover:text-cyan-400 transition-colors">Маніфест</a>
            <a href="#gallery" className="hover:text-cyan-400 transition-colors">Розробки</a>
            <a href="#proof" className="hover:text-cyan-400 transition-colors">Концепт SCI</a>
            <a href="#contacts" className="hover:text-cyan-400 transition-colors">Контакти</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        
        {/* РАЗДЕЛ 1: МАНИФЕСТ */}
        <section id="manifesto" className="space-y-6 max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-cyan-500 uppercase px-3 py-1 bg-cyan-950/50 border border-cyan-800 rounded-full">Концепція</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
            Емісійно-відбивному міст:<br/>
            <span className="text-indigo-400">Коли екран не бреше</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Існуюча індустрія (Photoshop CMYK Proof) безнадійно застаріла. Вона показує усреднену цифрову картинку, ігноруючи реальну фізику конкретного друкарського верстата. Художник бачить ідеальні випромінювані пікселі на моніторі, а на папері отримує бруд та втрату глибини колірних каналів.
          </p>
        </section>

        {/* РАЗДЕЛ 2: ГАЛЕРЕЯ НАПРАВЛЕНИЙ */}
        <section id="gallery" className="space-y-12">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl font-black tracking-tight">Галерея та напрямки досліджень</h2>
            <p className="text-slate-400 text-sm">Інтеграція художнього мистецтва, стеганографії та точних оптичних алгоритмів.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col">
                <div className="aspect-square bg-slate-950 relative overflow-hidden border-b border-slate-800">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60";
                    }}
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-950/80 rounded-md text-cyan-400 border border-slate-800">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                  </div>

                  {/* КНОПКА ССЫЛКИ НА ГЕНЕРАТОР */}
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-slate-100 rounded-xl shadow-lg shadow-indigo-950/50 transition-all duration-200"
                    >
                      Відкрити генератор &rarr;
                    </a>
                  ) : (
                    <div className="text-[11px] font-mono text-center text-slate-600 bg-slate-950/40 py-2 rounded-xl border border-slate-900">
                      Арт-експозиція
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* РАЗДЕЛ 3: КОНЦЕПТ МОДЕЛИ SCI */}
        <section id="proof" className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Головна Ідея</span>
            <h2 className="text-3xl font-black tracking-tight">Абсолютний спектральний Soft Proofing</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Самої програми ще немає в залізі — це фундаментальна інженерна ідея. Движок програми повинен в реальному часі пропускати кожен мазок пензля художника через математичну матрицю спотворень конкретного принтера.
            </p>
            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <p className="font-bold text-slate-300">Як це буде працювати:</p>
              <p>1. Друкується калібровочна матриця «Камертон» (конуси зі спектральним лімітером).</p>
              <p>2. Художник фотографує відбиток на смартфон.</p>
              <p>3. Алгоритм SCI зчитує фото, аналізує міжканальний Crosstalk та будує індивідуальний профіль.</p>
            </div>
          </div>

          {/* Визуальный симулятор идеи */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400">Симуляція відклику пігментів (Прототип)</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Міжканальний Crosstalk (накладання):</span>
                  <span className="text-indigo-400 font-mono">{crosstalk}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={crosstalk} onChange={(e) => setCrosstalk(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Поглинання світла папером:</span>
                  <span className="text-cyan-400 font-mono">{absorption}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={absorption} onChange={(e) => setAbsorption(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-1 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Визуальное поле "Сдвига спектра" */}
            <div className="h-24 rounded-xl relative overflow-hidden bg-gradient-to-r from-red-500 via-green-500 to-blue-500 flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-slate-950 transition-opacity duration-150" 
                style={{ opacity: (crosstalk * 0.4 + absorption * 0.4) / 100 }}
              />
              <span className="relative z-10 text-[10px] font-mono tracking-widest uppercase bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 text-slate-200">
                Фізичний відклик каналів
              </span>
            </div>
          </div>
        </section>

        {/* РАЗДЕЛ 4: КОНТАКТЫ */}
        <section id="contacts" className="border-t border-slate-800 pt-12 text-center space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Зв’язок з автором</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            З питань співробітництва, розвитку технології спектрального моделювання SCI або демонстрації стеганографічних робіт.
          </p>
          <div className="inline-block px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400 font-mono text-sm">
            Ваші контакти (Email / Telegram)
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        &copy; 2026 SCI Project. Всі права захищені. Art & Science.
      </footer>
    </div>
  );
}
