import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 py-4 shadow-md">
        <nav>
          <ul className="flex justify-center gap-8 list-none">
            <li>
              <a
                href="#about"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 mt-20">
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">nabecamel</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Web Developer & Software Engineer
          </p>
        </section>

        <section id="about" className="py-20 px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            About Me
          </h2>
		  <div className="text-lg text-left space-y-6 max-w-3xl mx-auto leading-loose">
            <p>
              はじめまして、nabecamelといいます。
              <br />
              現在は会社でエンジニア研修を受けながら、個人で副業やプロダクト開発に取り組んでいます。
            </p>
            <p>
              本格的な開発経験は多くありませんが、初めての副業案件では、Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツールを開発し、SlackやDiscordへの通知を一通り実装しました。実務で使われる構成を自分の手で作れたことは、貴重な経験でした。
            </p>
            <p>
              今はフロントエンド（React）やバックエンド（Spring Boot,
              Supabase）にも触れながら、フルスタックの開発スキルを少しずつ広げています。
            </p>
            <p>
              自分の得意なことを押し出すよりも、チームや依頼者の課題を一緒に考えながら動くのが好きです。
              <br />
              話しやすい雰囲気づくりや、相手の期待を把握することを意識して仕事をしています。
            </p>
            <p>
              もし何かお力になれそうなことがあれば、気軽にお声がけください。
            </p>
          </div>
        </section>

        <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-100 p-8 rounded-xl shadow hover:-translate-y-1 transition-transform">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Project 1
              </h3>
              <p className="text-base text-gray-700">Project description...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow hover:-translate-y-1 transition-transform">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Project 2
              </h3>
              <p className="text-base text-gray-700">Project description...</p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Skills
          </h2>
          <ul className="flex flex-wrap justify-center gap-4 list-none">
            <li className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
              React
            </li>
            <li className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
              TypeScript
            </li>
            <li className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
              JavaScript
            </li>
            <li className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
              CSS
            </li>
            <li className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
              HTML
            </li>
          </ul>
        </section>

        <section id="contact" className="py-20 px-4 bg-gray-100 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Contact</h2>
          <p className="text-lg mb-2">Email: watawata233013@gmail.com</p>
          <p className="text-lg">GitHub: github.com/nabecamel</p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-8">
        <p>&copy; 2025 nabecamel. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
