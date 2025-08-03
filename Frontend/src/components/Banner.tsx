const Banner = () => {
  return (
    <section
      className="relative flex items-center justify-center bg-gradient-to-br from-[#ff6ec4] via-[#7873f5] to-[#5f4efc] px-4 py-16 min-h-[100vh] transition-all duration-1000"
      id="home"
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">
        <div className="mb-6">
          <div className="text-yellow-300 text-5xl mb-2">
            <i className="bx bxs-star" />
          </div>
          <h1 className="text-4xl font-extrabold text-yellow-300 tracking-tight mb-4">
            TalentApp
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Descubre y apoya a los mejores talentos del mundo. Conecta, invierte y crece junto a ellos.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <a
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#fca311] to-[#ffb703] px-8 py-3 text-black font-bold shadow-md hover:opacity-90 transition-all"
          >
            Comenzar
          </a>
          <a
            href="/login"
            className="rounded-full border border-white/30 px-8 py-3 text-white font-medium bg-white/10 hover:bg-white/20 transition-all"
          >
            Ya tengo cuenta
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
