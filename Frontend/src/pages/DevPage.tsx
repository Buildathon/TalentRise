import DevList from "../components/DevList";

const DevPage = () => {
  return (
    <>
      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-700 to-purple-800 dark:from-indigo-900 dark:to-purple-900 shadow-lg z-50 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-lg select-none">
            TalentRise
          </h1>
        </div>
      </header>

      {/* Contenido principal con padding para no quedar debajo del header */}
      <main className="pt-24 min-h-screen bg-gradient-to-r from-indigo-700 to-purple-800 dark:from-indigo-900 dark:to-purple-900 px-6 sm:px-12 lg:px-24 transition-colors duration-700">
        <section className="max-w-7xl mx-auto mt-6">
          <DevList />
        </section>
      </main>
    </>
  );
};

export default DevPage;

